import Web3 from "web3";
import { setupNFTContract, getAllNFTS } from "./nftContract";
import { getRFTs } from "./rftFactoryContract";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";

const getNFTData = async (nftEventHandlers) => {
  let nftc = setupNFTContract(nftEventHandlers);
  let nfts = await getAllNFTS(nftc);
  return nfts;
};

const getRFTData = async (rftEventHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let rftAddressList = await getRFTs();

  if (Array.isArray(rftAddressList)) {
    let rftDataPromises = rftAddressList.map((rftAddress) => {
      let rftc = new web3.eth.Contract(rftABI, rftAddress);
      let res = rftc.methods.getData().call();
      return res;
    });
    return Promise.all(rftDataPromises).then((values) => {
      let rfts = values.map((value, index) => {
        //set end date
        let icoEndDate = 0;
        if (value[8] != 0) {
          icoEndDate = new Date(value[8] * 1000);
        }

        // set contract and event handlers
        let rftAddress = value[2];
        let rftc = new web3.eth.Contract(rftABI, rftAddress); // repeating...TBD
        rftc.events.ICOStarted(async (error, event) => {
          console.log("ICOStarted");

          if (rftEventHandler && rftEventHandler.handleICOStarted) {
            rftEventHandler.handleICOStarted(
              error,
              event.returnValues.nftAddress,
              event.returnValues.tokenId,
              event.returnValues.rftAddress,
              event.returnValues.name,
              event.returnValues.symbol,
              event.returnValues.icoSharePrice,
              event.returnValues.icoShareSupply,
              event.returnValues.icoShareReserve,
              event.returnValues.icoEnd,
              event.returnValues.owner
            );
          }
        });
        rftc.events.Bought(async (error, event) => {
          if (rftEventHandler && rftEventHandler.handleBought) {
            rftEventHandler.handleBought(
              error,
              event.returnValues.nftAddress,
              event.returnValues.tokenId,
              event.returnValues.rftAddress,
              event.returnValues.name,
              event.returnValues.symbol,
              event.returnValues.buyerAddress,
              event.returnValues.shareAmount
            );
          }
        });

        return {
          nftAddress: value[0],
          tokenId: value[1],
          rftAddress: value[2],
          name: value[3],
          symbol: value[4],
          tokenPrice: value[5],
          tokenSupply: web3.utils.fromWei(value[6]),
          tokenReserve: web3.utils.fromWei(value[7]),
          icoEndDate: icoEndDate,
          ownerAddress: value[9],
          balance: value[10],
          // rftc,
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
  try {
    let { accounts } = await connectToMetamask(null);
    let nfts = [];
    if (Array.isArray(allNftsMergedData)) {
      nfts = allNftsMergedData.filter((nft) => {
        if (nft.rft) {
          // console.log(nft.rft.ownerAddress);
          return (
            nft.rft.ownerAddress
              .toLowerCase()
              .localeCompare(accounts[0].toLowerCase()) === 0
          );
        } else {
          // console.log(nft.owner);
          return (
            nft.owner.toLowerCase().localeCompare(accounts[0].toLowerCase()) ===
            0
          );
        }
      });
      return nfts;
    }
  } catch (error) {
    console.error(error);
  }
};

export { getNFTData, getRFTData, getMergedData, filterMergedDataForAddress };
