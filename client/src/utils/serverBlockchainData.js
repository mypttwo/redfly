import axios from "axios";
import { address as nftContractAddress } from "./nftContractDef";

const getBlockchainDataFromServer = async () => {
  let response = await axios.get(`/blockchainData`);
  return response.data;
};

const getBlockchainDataFromServerMintUpdate = async (
  tokenId,
  nftMap,
  nftTokenDataMap
) => {
  let response = await axios.post(`/blockchainData/minted`, {
    nftContractAddress: nftContractAddress,
    tokenId: tokenId,
  });
  return processBlockchainDataFromServer(
    response.data,
    nftMap,
    nftTokenDataMap
  );
};

const getBlockchainDataFromServerNewIcoUpdate = async (
  rftContractAddress,
  nftMap,
  nftTokenDataMap
) => {
  let response = await axios.post(`/blockchainData/newico`, {
    rftContractAddress: rftContractAddress,
  });
  return processBlockchainDataFromServer(
    response.data,
    nftMap,
    nftTokenDataMap
  );
};

const processBlockchainDataFromServer = (
  blockchainData,
  nftMap,
  nftTokenDataMap
) => {
  //getting internal nfts
  let nftTokenDataListInternal = blockchainData.nftTokens;
  for (let nftTokenData of nftTokenDataListInternal) {
    if (nftTokenData.rft && nftTokenData.rft.icoEndDate) {
      nftTokenData.rft.icoEndDate = new Date(
        Date.parse(nftTokenData.rft.icoEndDate)
      );
    }
  }

  for (let nftTokenData of nftTokenDataListInternal) {
    nftTokenDataMap.set(
      nftTokenData.nftContractAddress.toLowerCase() + nftTokenData.tokenId,
      nftTokenData
    );
  }
  if (blockchainData.nftData) {
    nftMap.set(blockchainData.nftData.contractAddress, blockchainData.nftData);
  }

  return { nftMap, nftTokenDataMap };
};

const getBlockchainData = async (nftMap, nftTokenDataMap) => {
  console.log("reading blockchain data from server");

  let blockchainData = await getBlockchainDataFromServer();
  return processBlockchainDataFromServer(
    blockchainData,
    nftMap,
    nftTokenDataMap
  );
};

export {
  getBlockchainData,
  getBlockchainDataFromServerMintUpdate,
  getBlockchainDataFromServerNewIcoUpdate,
};
