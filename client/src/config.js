require("dotenv").config();

const server = process.env.REACT_APP_SERVER;
const nftContractAddress = process.env.REACT_APP_NFT_ADDRESS;
const rftFactoryContractAddress = process.env.REACT_APP_RFT_FACTORY_ADDRESS;
const network = process.env.REACT_APP_NETWORK;

module.exports = {
  server,
  nftContractAddress,
  rftFactoryContractAddress,
  network,
};
