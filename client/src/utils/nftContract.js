import Web3 from "web3";
import { abi, address } from "./nftContractDef";
import connectToMetamask from "../utils/metamask";
import axios from "axios";

const setupNFTContract = (eventHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let nftc = new web3.eth.Contract(abi, address);

  nftc.events.Minted(async (error, event) => {
    if (eventHandler && eventHandler.handleMinted) {
      if (error) {
        eventHandler.handleMinted(error);
      } else {
        eventHandler.handleMinted(
          error,
          event.returnValues.tokenId,
          event.returnValues.minter
        );
      }
    }
  });

  nftc.events.Burnt(async (error, event) => {
    if (eventHandler && eventHandler.handleBurnt) {
      eventHandler.handleBurnt(
        error,
        event.returnValues.tokenId,
        event.returnValues.minter
      );
    }
  });

  nftc.events.TokenURIUpdated(async (error, event) => {
    if (eventHandler && eventHandler.handleTokenURIUpdated) {
      eventHandler.handleTokenURIUpdated(
        error,
        event.returnValues.tokenId,
        event.returnValues.minter
      );
    }
  });

  nftc.events.FeesUpdated(async (error, event) => {
    if (eventHandler && eventHandler.handleFeesUpdated) {
      eventHandler.handleFeesUpdated(error, event.returnValues.fees);
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
        .on("receipt", function (receipt) {
          //console.log("receipt :" + JSON.stringify(receipt));
          recieptHandler(null, receipt);
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          //   console.log("error :" + error);
          //   console.log("receipt :" + receipt);
          recieptHandler(error, receipt);
        });
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

const approveTransferOfTokenFromNFTToRFT = async (
  nftc,
  rftAddress,
  tokenId
) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      await nftc.methods
        .approve(rftAddress, tokenId)
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

const getAllNFTS = async (nftc) => {
  let tokenData = await nftc.methods.allTokens().call();
  let tokenUriPromises = tokenData[1].map((tokenURI) => {
    return axios.get(tokenURI);
  });
  return Promise.all(tokenUriPromises).then((values) => {
    let nfts = values.map((value, index) => {
      let nft = value.data;
      nft.tokenId = tokenData[0][index];
      nft.owner = tokenData[2][index];
      return nft;
    });
    return nfts;
  });
};

export {
  setupNFTContract,
  createNFT,
  getAllNFTS,
  withdraw,
  approveTransferOfTokenFromNFTToRFT,
};
