"use strict";

const { network, networkWss } = require("../config");
const web3 = require("./web3");
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
let trxSet = new Set();

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
    console.log("Minted event trxHash : ", event.transactionHash);
    if (trxSet.has(event.transactionHash)) {
      console.log(
        `Minted event trxHash : ${event.transactionHash} is already being processed. Not processing.`
      );
      return;
    }
    trxSet.add(event.transactionHash);
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
  let nftTokenList = await getAllNFTTokensInternal(nftc, nftTokenDataMap);
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
  let rftAddressListAll = await getRFTAddressList(rftfc);
  let rftAddressList = rftAddressListAll.filter((rftAddress) => {
    if (!rftSet.has(rftAddress)) {
      rftSet.add(rftAddress);
      return true;
    }
  });
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

const msToTime = (duration) => {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
  console.log(`blockchainData Execution time: ${msToTime(end - start)} ms`);
  return blockchainData;
};

module.exports = {
  getData,
  mintUpdate,
  newIcoUpdate,
  icoStartUpdate,
  readBlockchain,
};
