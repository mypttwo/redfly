import axios from "axios";
import Web3 from "web3";
import connectToMetamask from "./metamask";
import { getDescription, getImage, getName } from "../utils/tokenURIReader";
import { address as nftAddress } from "./nftContractDef";
import { createNFTTokenObj } from "./createObj";

//https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
const erc721ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const getNFTsForAddress = async (nftTokenDataMap, nftMap) => {
  try {
    let web3 = new Web3(window.web3.currentProvider);
    let { accounts } = await connectToMetamask(null);
    let jsonResponse = await axios.get(
      `https://api-kovan.etherscan.io/api?module=account&action=tokennfttx&address=${accounts[0]}&startblock=0&endblock=999999999&sort=desc&apikey=YourApiKeyToken`
      //   "https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x96bEE49d3386d674bF4E956D9B3ce61b9540409D&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken"
    );
    if (jsonResponse && jsonResponse.data && jsonResponse.data.result) {
      //   console.log(jsonResponse.data.result);
      let addressTokenIdMap = new Map();
      jsonResponse.data.result.forEach((element) => {
        // console.log("element.contractAddress", element.contractAddress);
        // console.log("element.tokenID", element.tokenID);
        // console.log("NFT", element);
        if (element.contractAddress && element.tokenID) {
          addressTokenIdMap.set(
            element.contractAddress.toLowerCase() + element.tokenID,
            {
              contractAddress: element.contractAddress,
              tokenId: element.tokenID,
              tokenName: element.tokenName,
              tokenSymbol: element.tokenSymbol,
            }
          );
        }
      });
      //   console.log(addressTokenIdMap);

      console.log(nftAddress);
      let nftTrxDataArray = Array.from(addressTokenIdMap.values()).filter(
        (nftTrx) => {
          let internal =
            nftTrx.contractAddress
              .toLowerCase()
              .localeCompare(nftAddress.toLowerCase()) == 0;

          let alreadyImported = nftTokenDataMap.get(
            nftTrx.contractAddress.toLowerCase() + nftTrx.tokenId
          );
          return !internal && !alreadyImported;
        }
      );
      //   console.log(nftTrxDataArray);

      let ownerCheckPromises = [];
      nftTrxDataArray.forEach(async (nftData) => {
        let nftc = new web3.eth.Contract(erc721ABI, nftData.contractAddress);
        try {
          let ownerCheckPromise = nftc.methods
            .ownerOf(nftData.tokenId)
            .call({ from: accounts[0] });
          //   console.log(nftData.tokenId);
          ownerCheckPromises.push(ownerCheckPromise);
        } catch (error) {
          console.error(
            `${nftData.contractAddress} or ${nftData.tokenId} fail`,
            error
          );
        }
      });
      return Promise.all(ownerCheckPromises)
        .then((owners) => {
          let nftArray = [];
          let owner_ = accounts[0];
          owners.forEach((owner, index) => {
            if (owner.toLowerCase().localeCompare(owner_.toLowerCase()) == 0) {
              // let nft = nftTrxDataArray[index];
              let nft = createNFTTokenObj(
                nftTrxDataArray[index].contractAddress,
                nftTrxDataArray[index].tokenName,
                nftTrxDataArray[index].tokenSymbol,
                accounts[0],
                nftTrxDataArray[index].tokenId,
                null,
                null,
                null
              );

              nftArray.push(nft);
            }
          });
          //   console.log(nftArray);
          let tokenUriCallList = nftArray.map((nftData) => {
            let nftc = new web3.eth.Contract(
              erc721ABI,
              nftData.nftContractAddress
            );
            return nftc.methods
              .tokenURI(nftData.tokenId)
              .call({ from: accounts[0] });
          });
          return Promise.all(tokenUriCallList).then((tokenUris) => {
            tokenUris.forEach((tokenUri, index) => {
              nftArray[index].tokenURI = tokenUri;
            });
            // console.log(nftArray);
            return nftArray;
          });
        })
        .catch((error) => {
          //   console.error("err", error);
        });
    }
  } catch (error) {
    console.error(error);
  }
};

const delay = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

const getNFTDataArray = async (nftArray, handler) => {
  let results = [];
  let errors = [];
  //   console.log(nftArray);
  // nftArray.forEach(async (nft, index) => {
  for (let nft of nftArray) {
    // await delay();
    await axios
      .get(`/ipfs?iurl=${nft.tokenURI}`)
      .then((result) => {
        results.push(result);
      })
      .catch((error) => {
        console.error("err", error);
        errors.push(nft);
        return;
      });
  }

  for (let c = 0; c < 3; c++) {
    if (nftArray.length == errors.length + results.length) {
      break;
    }
    await delay();
  }
  let nfts = results.map((value, index) => {
    try {
      let nft = nftArray[index];
      nft.name = getName(value.data);
      nft.description = getDescription(value.data);
      nft.image = getImage(value.data);
      return nft;
    } catch (error) {
      console.error("reading nft from token Data err", error);
    }
  });
  //   console.log(nfts);
  let nfts_ = nfts.filter((nft) => nft);
  handler(nfts_, errors);
};

export { getNFTsForAddress, getNFTDataArray };
