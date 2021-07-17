"use strict";

const axios = require("axios");
const { getDescription, getImage, getName } = require("./tokenURIReader");
const { createNFTObj, createNFTTokenObj } = require("./createObj");

const delay = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

const getAllNFTTokensInternal = async (nftc) => {
  try {
    let tokenData = await nftc.methods.allTokens().call();

    let tokenUriPromises = [];
    for (let tokenURI of tokenData[1]) {
      await delay();
      tokenUriPromises.push(axios.get(`${tokenURI}`));
    }

    return Promise.all(tokenUriPromises).then((values) => {
      let nfts = values.map((value, index) => {
        try {
          let nft = createNFTTokenObj(
            nftc.options.address,
            null,
            null,
            tokenData[2][index],
            tokenData[0][index],
            tokenData[1][index],
            getName(value.data),
            getImage(value.data),
            getDescription(value.data)
          );
          if (value.data.links) {
            nft.links = value.data.links;
          }
          return nft;
        } catch (error) {
          console.error("reading nft from token Data err", error);
        }
      });
      //   console.log(nfts);
      return nfts.filter((nft) => nft);
    });
  } catch (error) {
    console.error(error);
  }
};

const getNFTData = async (nftc) => {
  let namePromise = nftc.methods.name().call();
  let symbolPromise = nftc.methods.symbol().call();
  return Promise.all([namePromise, symbolPromise]).then((values) => {
    return createNFTObj(nftc.options.address, values[0], values[1]);
  });
};

const setupNFTContract = (web3, abi, address, eventHandler) => {
  let nftc = new web3.eth.Contract(abi, address);

  nftc.events.Minted(async (error, event) => {
    if (eventHandler && eventHandler.handleMinted) {
      eventHandler.handleMinted(error, event);
    }
  });

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

module.exports = { setupNFTContract, getAllNFTTokensInternal, getNFTData };
