"use strict";

require("dotenv").config();

const dbConnStr = process.env.DB_CONN_STR;
const port = process.env.PORT;
const ipfsKey = process.env.IPFS_KEY;
const ipfsSecretKey = process.env.IPFS_SECRET_KEY;

module.exports = {
  dbConnStr,
  port,
  ipfsKey,
  ipfsSecretKey,
};
