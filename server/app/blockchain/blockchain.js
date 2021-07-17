"use strict";

const { network, networkWss } = require("../config");
const Web3 = require("web3");
const { abi: nftABI, address: nftAddress } = require("./nftContractDef");
const {
  abi: rftFactoryABI,
  address: rftFactoryAddress,
} = require("./rftFactoryContractDef");
const {
  setupNFTContract,
  getAllNFTTokensInternal,
  getNFTData,
} = require("./nftContract");
const {
  setupRFTFactoryContract,
  getRFTAddressList,
} = require("./rftFactoryContract");
const { getRFTData, getRFTDataList } = require("./rftContract");
const { getNFTTokenData, getNFTDataForAddress } = require("./nftData");

let blockchainData = { nftTokens: [], nfts: [] };
let nftTokenDataMap = new Map();
let nftMap = new Map();
let rftSet = new Set();
// const web3 = new Web3(new Web3.providers.WebsocketProvider(network));
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(networkWss, {
    clientOptions: {
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
  })
);

const handleNewRFT = async (error, event) => {
  if (error) {
    console.error("New RFT event", error);
  } else {
    if (event.returnValues && event.returnValues.rft) {
      console.log("handleNewRFT rft", event.returnValues.rft);
      let rft = getRFTData(event.returnValues.rft);
      await setNFTDataForRFT(rft);
    }
  }
};

const getRFTFactoryEventHandlers = () => {
  return {
    handleNewRFT: handleNewRFT,
  };
};

const handleMinted = async (error, event) => {
  if (error) {
    console.error("Minted event", error);
  } else {
    console.log(JSON.stringify(event));
    if (event.returnValues && event.returnValues.tokenId) {
      console.log("handleMinted tokenId", event.returnValues.tokenId);
      let nftTokenData = await getNFTTokenData(
        web3,
        nftAddress,
        event.returnValues.tokenId
      );
      nftTokenDataMap.set(
        nftTokenData.nftContractAddress.toLowerCase() + nftTokenData.tokenId,
        nftTokenData
      );
      console.log("New NFT Minted", JSON.stringify(nftTokenData));
    }
  }
};

const icoStartUpdate = async (rftContractAddress) => {
  let nftTokenArray = Array.from(nftTokenDataMap.values());
  let nftTokenResultArray = nftTokenArray.filter((nftToken) => {
    return (
      nftToken.rft && nftToken.rft.rftContractAddress == rftContractAddress
    );
  });
  if (nftTokenResultArray.length) {
    if (!nftTokenResultArray[0].rft.icoEndDate) {
      let rft = await getRFTData(rftContractAddress);
      nftTokenResultArray[0].rft = rft;
      nftTokenDataMap.set(
        nftTokenResultArray[0].nftContractAddress.toLowerCase() +
          nftTokenResultArray[0].tokenId,
        nftTokenResultArray[0]
      );
      let nftTokens = Array.from(nftTokenDataMap.values());
      let nfts = Array.from(nftMap.values());
      blockchainData = { nftTokens, nfts };
    }
  }

  return blockchainData;
};

const newIcoUpdate = async (rftContractAddress) => {
  if (!rftSet.has(rftContractAddress)) {
    let rft = await getRFTData(rftContractAddress);
    if (rft) {
      rftSet.add(rftContractAddress);

      await setNFTDataForRFT(rft);
      console.log("New ICO Created", JSON.stringify(rft));
      let nftTokens = Array.from(nftTokenDataMap.values());
      let nfts = Array.from(nftMap.values());
      blockchainData = { nftTokens, nfts };
    }
  }
  return blockchainData;
};

const mintUpdate = async (nftContractAddress, tokenId) => {
  let nftTokenData = nftTokenDataMap.get(
    nftContractAddress.toLowerCase() + tokenId
  );
  if (!nftTokenData) {
    nftTokenData = await getNFTTokenData(web3, nftContractAddress, tokenId);
    nftTokenDataMap.set(
      nftTokenData.nftContractAddress.toLowerCase() + nftTokenData.tokenId,
      nftTokenData
    );
    console.log("New NFT Minted", JSON.stringify(nftTokenData));
    let nftTokens = Array.from(nftTokenDataMap.values());
    let nfts = Array.from(nftMap.values());
    blockchainData = { nftTokens, nfts };
  }
  return blockchainData;
};

const getNFTEventHandlers = () => {
  return {
    handleMinted: handleMinted,
  };
};

const setNFTDataForRFT = async (rft) => {
  let nftTokenData = nftTokenDataMap.get(
    rft.nftContractAddress.toLowerCase() + rft.nftTokenId
  );
  if (!nftTokenData) {
    nftTokenData = await getNFTTokenData(
      web3,
      rft.nftContractAddress,
      rft.nftTokenId
    );
  }
  nftTokenData.rft = rft;
  nftTokenDataMap.set(
    rft.nftContractAddress.toLowerCase() + rft.nftTokenId,
    nftTokenData
  );
  let nft = nftMap.get(nftTokenData.nftContractAddress);
  if (!nft) {
    nft = await getNFTDataForAddress(web3, nftTokenData.nftContractAddress);
    nftMap.set(nftTokenData.nftContractAddress, nft);
  }
};

const readBlockchain = async () => {
  console.log("reading blockchain");

  //reading nft data
  let start = Date.now();
  let nftc = setupNFTContract(web3, nftABI, nftAddress, getNFTEventHandlers());
  let nftTokenList = await getAllNFTTokensInternal(nftc);
  let nftData = await getNFTData(nftc);
  let end = Date.now();
  console.log(`nfts Execution time: ${end - start} ms`);

  for (let nftTokenData of nftTokenList) {
    nftTokenDataMap.set(
      nftTokenData.nftContractAddress.toLowerCase() + nftTokenData.tokenId,
      nftTokenData
    );
  }

  nftMap.set(nftData.contractAddress, nftData);

  //reading rft data
  start = Date.now();
  let rftfc = setupRFTFactoryContract(
    web3,
    rftFactoryABI,
    rftFactoryAddress,
    getRFTFactoryEventHandlers()
  );
  let rftAddressList = await getRFTAddressList(rftfc);
  rftSet = new Set(rftAddressList);
  let rfts = await getRFTDataList(rftAddressList);
  end = Date.now();
  console.log(`rfts Execution time: ${end - start} ms`);

  //Populating nftTokens with rfts;
  //if the nftToken is not available we first get it from the blockchain
  //and then populate the nftToken with the rft
  for (let rft of rfts) {
    await setNFTDataForRFT(rft);
  }
  let nftTokens = Array.from(nftTokenDataMap.values());
  let nfts = Array.from(nftMap.values());

  return { nftTokens, nfts };
};

const getData = async () => {
  let start = Date.now();
  console.log("network", networkWss);
  if (!nftTokenDataMap.size) {
    await readBlockchain();
  }
  let nftTokens = Array.from(nftTokenDataMap.values());
  let nfts = Array.from(nftMap.values());
  blockchainData = { nftTokens, nfts };
  console.log("data", blockchainData);
  let end = Date.now();
  console.log(`blockchainData Execution time: ${end - start} ms`);
  return blockchainData;
};

module.exports = { getData, mintUpdate, newIcoUpdate, icoStartUpdate };
