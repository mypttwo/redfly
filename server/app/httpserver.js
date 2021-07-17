"use strict";

const express = require("express");
const http = require("http");
const https = require("https");
const cors = require("cors")();
const proxySetup = require("./proxySetup");
const fs = require("fs");
const path = require("path");

let certDir = path.join(__dirname, "../cert");

let key = fs.readFileSync(certDir + "/key.pem");
let cert = fs.readFileSync(certDir + "/cert.pem");
let credentials = {
  key: key,
  cert: cert,
};

const tokenInfoController = require("./controllers/tokenInfo");
const blockchainDataController = require("./controllers/blockchain");

let app = express();

app.use(cors);

app.use("/tokenInfo", tokenInfoController);
app.use("/blockchainData", blockchainDataController);

proxySetup(app);

app.use(express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  let indexFile = path.join(__dirname, "../build", "index.html");
  console.log(indexFile);
  res.sendFile(indexFile);
});

const server = http.createServer(app);
const serverSSL = https.createServer(credentials, app);

module.exports = { server, serverSSL };
