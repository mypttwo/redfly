// import Web3 from "web3";
// import { setupNFTContract, getAllNFTTokensInternal } from "./nftContract";
// import { getRFTAddressList } from "./rftFactoryContract";
// import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";
// import { createNFTObj, createNFTTokenObj, createRFTObj } from "./createObj";
// import { getNFTDataArray } from "./nftTokenTracker";

// const getNFTTokenDataInternal = async (nftEventHandlers) => {
//   let nftc = setupNFTContract(nftEventHandlers);
//   let start = Date.now();

//   let nfts = await getAllNFTTokensInternal(nftc);

//   let end = Date.now();
//   console.log(`getAllNFTTokensInternal Execution time: ${end - start} ms`);

//   return nfts;
// };

// const getRFTData = async (rftEventHandler, rftAddressList) => {
//   let web3 = new Web3(window.web3.currentProvider);

//   let start = Date.now();
//   if (Array.isArray(rftAddressList)) {
//     let rftDataPromises = rftAddressList.map((rftAddress) => {
//       let rftc = new web3.eth.Contract(rftABI, rftAddress);
//       let res = rftc.methods.getData().call();
//       return res;
//     });
//     return Promise.all(rftDataPromises).then((values) => {
//       let rfts = values.map((value) => {
//         //set end date
//         let icoEndDate = 0;
//         if (value[8] != 0) {
//           icoEndDate = new Date(value[8] * 1000);
//         }

//         // set contract and event handlers
//         // let rftAddress = value[2];
//         // let rftc = new web3.eth.Contract(rftABI, rftAddress); // repeating...TBD
//         // rftc.events.ICOStarted(async (error, event) => {
//         //   console.log("ICOStarted");

//         //   if (rftEventHandler && rftEventHandler.handleICOStarted) {
//         //     rftEventHandler.handleICOStarted(error, event);
//         //   }
//         // });
//         // rftc.events.Bought(async (error, event) => {
//         //   if (rftEventHandler && rftEventHandler.handleBought) {
//         //     rftEventHandler.handleBought(error, event);
//         //   }
//         // });

//         //Create rft object
//         let rft = createRFTObj(
//           value[0],
//           value[1],
//           value[9],
//           value[2],
//           value[3],
//           value[4],
//           value[5],
//           web3.utils.fromWei(value[6]),
//           web3.utils.fromWei(value[7]),
//           icoEndDate,
//           value[10]
//         );
//         // console.log("RFT Obj created", rft);
//         return rft;
//       });
//       let end = Date.now();
//       console.log(`reading RFTs Execution time: ${end - start} ms`);
//       return rfts;
//     });
//   }

//   return [];
// };

// // const filterRFTByTokenId = (rfts, tokenId) => {
// //   return rfts.filter((rft) => rft.nftTokenId === tokenId);
// // };

// // const getMergedData = async (rftEventHandlers) => {
// //   let nftTokens = await getNFTTokenDataInternal();
// //   let rfts = await getRFTData(rftEventHandlers);

// //   nftTokens.forEach((nftToken) => {
// //     let rftsForToken = filterRFTByTokenId(rfts, nftToken.tokenId);
// //     if (rftsForToken.length > 0) {
// //       nftToken.rft = rftsForToken[0];
// //     }
// //   });
// //   return nftTokens;
// // };

const filterMergedDataForAddress = async (allNftsMergedData) => {
  try {
    let { accounts } = await connectToMetamask(null);
    let nfts = [];
    if (Array.isArray(allNftsMergedData)) {
      nfts = allNftsMergedData.filter((nft) => {
        if (nft.rft) {
          // console.log(nft.rft.owner);
          return (
            nft.rft.owner
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

export {
  // getNFTTokenDataInternal,
  // getRFTData,
  // getRFTAddressList,
  // getMergedData,
  filterMergedDataForAddress,
};
