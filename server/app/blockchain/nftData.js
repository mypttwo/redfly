"use strict";

const axios = require("axios");
const { getDescription, getImage, getName } = require("./tokenURIReader");
const { createNFTObj, createNFTTokenObj } = require("./createObj");

const erc721ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
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

const getNFTTokenData = async (web3, nftContractAddress, nftTokenId) => {
  let nftc = new web3.eth.Contract(erc721ABI, nftContractAddress);

  let owner = await nftc.methods.ownerOf(nftTokenId).call();
  //   let owner = ""; //Optimization
  let tokenURI = await nftc.methods.tokenURI(nftTokenId).call();

  let name,
    image,
    description = "";
  let tokenURIData = await axios.get(`${tokenURI}`);
  if (tokenURIData) {
    name = getName(tokenURIData.data);
    description = getDescription(tokenURIData.data);
    image = getImage(tokenURIData.data);
  }

  let nftTokenData = createNFTTokenObj(
    nftContractAddress,
    null,
    null,
    owner,
    nftTokenId,
    tokenURI,
    name,
    image,
    description
  );
  if (tokenURIData.data.links) {
    nftTokenData.links = tokenURIData.data.links;
  }

  return nftTokenData;
};

const getNFTDataForAddress = async (web3, nftContractAddress) => {
  let nftc = new web3.eth.Contract(erc721ABI, nftContractAddress);

  let name = await nftc.methods.name().call();
  let symbol = await nftc.methods.symbol().call();
  return createNFTObj(nftContractAddress, name, symbol);
};

module.exports = { getNFTTokenData, getNFTDataForAddress };
