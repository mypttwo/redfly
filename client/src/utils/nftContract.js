import Web3 from "web3";
import { abi, address } from "./nftContractDef";
import connectToMetamask from "../utils/metamask";
// import {
//   getUrlExtension,
//   getDescription,
//   getImage,
//   getName,
// } from "../utils/tokenURIReader";
// import { createNFTObj, createNFTTokenObj } from "./createObj";
// import axios from "axios";

const setupNFTContract = (eventHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let nftc = new web3.eth.Contract(abi, address);

  nftc.events.Minted(async (error, event) => {
    if (eventHandler && eventHandler.handleMinted) {
      eventHandler.handleMinted(error, event);
    }
  });

  // nftc.events
  //   .Minted({ fromBlock: 3 })
  //   .on("data", function (event) {
  //     if (eventHandler && eventHandler.handleMinted) {
  //       eventHandler.handleMinted(null, event);
  //     }
  //   })
  //   .on("error", function (error) {
  //     if (eventHandler && eventHandler.handleMinted) {
  //       eventHandler.handleMinted(error, null);
  //     }
  //   });

  nftc.events.Burnt(async (error, event) => {
    if (eventHandler && eventHandler.handleBurnt) {
      eventHandler.handleBurnt(error, event);
    }
  });

  nftc.events.TokenURIUpdated(async (error, event) => {
    if (eventHandler && eventHandler.handleTokenURIUpdated) {
      eventHandler.handleTokenURIUpdated(error, event);
    }
  });

  nftc.events.FeesUpdated(async (error, event) => {
    if (eventHandler && eventHandler.handleFeesUpdated) {
      eventHandler.handleFeesUpdated(error, event);
    }
  });

  return nftc;
};

const createNFT = async (nftc, tokenUri, recieptHandler) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let fees = await nftc.methods.fees().call({ from: accounts[0] });

      await nftc.methods
        .mint(tokenUri)
        .send({ from: accounts[0], value: fees })
        .on("transactionHash", function (hash) {
          console.log("hash :" + hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          //console.log("receipt :" + JSON.stringify(receipt));
          recieptHandler(null, confirmationNumber, receipt);
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          //   console.log("error :" + error);
          //   console.log("receipt :" + receipt);
          recieptHandler(error, null, receipt);
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const getApproved = async (nftc, tokenId) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let approved = await nftc.methods
        .getApproved(tokenId)
        .call({ from: accounts[0] });
      console.log(approved);
      return approved;
    } catch (error) {
      console.error(error);
    }
  }
};

const withdraw = async (nftc) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      await nftc.methods
        .withdraw()
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("hash :" + hash);
        })
        .on("receipt", function (receipt) {
          console.log("receipt :" + JSON.stringify(receipt));
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log("error :" + error);
          console.log("receipt :" + JSON.stringify(receipt));
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const approveTransferOfTokenFromNFTToRFT = async (rft, recieptHandler) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let rftAddress = rft.rftContractAddress;
      let tokenId = rft.nftTokenId;
      let web3 = new Web3(window.web3.currentProvider);
      let nftc = new web3.eth.Contract(abi, rft.nftContractAddress);

      await nftc.methods
        .approve(rftAddress, tokenId)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("hash :" + hash);
        })
        .on("receipt", function (receipt) {
          if (recieptHandler) {
            recieptHandler(null, receipt);
          } else console.log("receipt :" + JSON.stringify(receipt));
        })
        .on("error", function (error, receipt) {
          if (recieptHandler) {
            recieptHandler(error, receipt);
          } else {
            console.log("error :" + error);
            console.log("receipt :" + JSON.stringify(receipt));
          }
        });
    } catch (error) {
      console.error(error);
      recieptHandler(error);
    }
  }
};
// const getNFT = async (nftc) => {
//   try {
//     let name = await nftc.methods.name().call();
//     let symbol = await nftc.methods.name().call();
//     let nft = createNFTObj(nftc.options.address, name, symbol);

//     console.log("NFT", nft);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getAllNFTTokensInternal = async (nftc) => {
//   try {
//     let start = Date.now();

//     let tokenData = await nftc.methods.allTokens().call();

//     let end = Date.now();
//     console.log(`all tokens Execution time: ${end - start} ms`);

//     // console.log(JSON.stringify(tokenData[1]));
//     let tokenUriPromises = tokenData[1].map((tokenURI) => {
//       return axios.get(`/ipfs?iurl=${tokenURI}`);
//     });
//     return Promise.all(tokenUriPromises).then((values) => {
//       let nfts = values.map((value, index) => {
//         try {
//           let nft = createNFTTokenObj(
//             nftc.options.address,
//             null,
//             null,
//             tokenData[2][index],
//             tokenData[0][index],
//             tokenData[1][index],
//             getName(value.data),
//             getImage(value.data),
//             getDescription(value.data)
//           );
//           if (value.data.links) {
//             nft.links = value.data.links;
//           }
//           return nft;
//         } catch (error) {
//           console.error("reading nft from token Data err", error);
//         }
//       });
//       console.log(nfts);
//       return nfts.filter((nft) => nft);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

export {
  setupNFTContract,
  createNFT,
  // getNFT,
  // getAllNFTTokensInternal,
  withdraw,
  approveTransferOfTokenFromNFTToRFT,
  getApproved,
};
