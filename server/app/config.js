"use strict";

require("dotenv").config();

const dbConnStr = process.env.DB_CONN_STR;
const port = process.env.PORT;
const portSSL = process.env.PORTSSL;
const ipfsKey = process.env.IPFS_KEY;
const ipfsSecretKey = process.env.IPFS_SECRET_KEY;
const network = process.env.NETWORK_SRV;
const networkWss = process.env.NETWORK_WSS;
const nftContractAddress = process.env.NFT_ADDRESS;
const rftFactoryContractAddress = process.env.RFT_FACTORY_ADDRESS;

module.exports = {
  dbConnStr,
  port,
  portSSL,
  ipfsKey,
  ipfsSecretKey,
  network,
  networkWss,
  nftContractAddress,
  rftFactoryContractAddress,
};
