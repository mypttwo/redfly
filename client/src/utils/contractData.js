import Web3 from "web3";
import { setupNFTContract, getAllNFTS } from "./nftContract";
import { setupRFTFactoryContract, getRFTs } from "./rftFactoryContract";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";

const getNFTData = async (nftEventHandlers) => {
  let nftc = setupNFTContract(nftEventHandlers);
  let nfts = await getAllNFTS(nftc);
  return nfts;
};

const getRFTData = async (rftFactoryEventHandlers, rftEventHandlers) => {
  let rftfc = setupRFTFactoryContract(rftFactoryEventHandlers);

  let rftAddressList = await getRFTs(rftfc, rftEventHandlers);

  if (Array.isArray(rftAddressList)) {
    let rftDataPromises = rftAddressList.map((rftAddress) => {
      let web3 = new Web3(window.web3.currentProvider);
      let rftc = new web3.eth.Contract(rftABI, rftAddress);
      let res = rftc.methods.getData().call();

      return res;
    });
    return Promise.all(rftDataPromises).then((values) => {
      let rfts = values.map((value, index) => {
        //temp code to get balance; should be removed after contract->getData returns this as last param
        // let { accounts } = await connectToMetamask(null);
        // let web3 = new Web3(window.web3.currentProvider);
        // let rftc = new web3.eth.Contract(rftABI, rftAddressList[index]);
        // let balance = await rftc.methods.balanceOf(accounts[0]).call();
        // console.log(balance);

        let icoEndDate = 0;
        if (value[8] !== 0) {
          icoEndDate = new Date(value[8] * 1000);
        }
        return {
          nftAddress: value[0],
          tokenId: value[1],
          rftAddress: value[2],
          name: value[3],
          symbol: value[4],
          tokenPrice: value[5],
          tokenSupply: value[6],
          tokenReserve: value[7],
          icoEndDate: icoEndDate,
          ownerAddress: value[9],
          // balance,
        };
      });
      return rfts;
    });
  }
  return [];
};

const filterRFTByTokenId = (rfts, tokenId) => {
  return rfts.filter((rft) => rft.tokenId === tokenId);
};

const getMergedData = async (rftEventHandlers) => {
  let nfts = await getNFTData();
  let rfts = await getRFTData(rftEventHandlers);

  nfts.forEach((nft) => {
    let rftsForToken = filterRFTByTokenId(rfts, nft.tokenId);
    if (rftsForToken.length > 0) {
      nft.rft = rftsForToken[0];
    }
  });
  return nfts;
};

const filterMergedDataForAddress = async (allNftsMergedData) => {
  let { accounts } = await connectToMetamask(null);
  let nfts = [];
  if (Array.isArray(allNftsMergedData)) {
    nfts = allNftsMergedData.filter((nft) => {
      if (nft.rft) {
        console.log(nft.rft.ownerAddress);
        return (
          nft.rft.ownerAddress
            .toLowerCase()
            .localeCompare(accounts[0].toLowerCase()) === 0
        );
      } else {
        console.log(nft.owner);
        return (
          nft.owner.toLowerCase().localeCompare(accounts[0].toLowerCase()) === 0
        );
      }
    });
  }
  return nfts;
};

export { getNFTData, getRFTData, getMergedData, filterMergedDataForAddress };
