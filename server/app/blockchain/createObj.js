const createNFTObj = (contractAddress, name, symbol) => {
  return { contractAddress, name, symbol };
};
const createNFTTokenObj = (
  nftContractAddress,
  nftName,
  nftSymbol,
  owner,
  tokenId,
  tokenURI,
  name,
  image,
  description
) => {
  return {
    nftContractAddress,
    nftName,
    nftSymbol,
    owner,
    tokenId,
    tokenURI,
    name,
    image,
    description,
  };
};

const createRFTObj = (
  nftContractAddress,
  nftTokenId,
  owner,
  rftContractAddress,
  name,
  symbol,
  tokenPrice,
  tokenSupply,
  tokenReserve,
  icoEndDate,
  balance
) => {
  return {
    nftContractAddress,
    nftTokenId,
    owner,
    rftContractAddress,
    name,
    symbol,
    tokenPrice,
    tokenSupply,
    tokenReserve,
    icoEndDate,
    balance,
  };
};

module.exports = { createNFTObj, createNFTTokenObj, createRFTObj };
