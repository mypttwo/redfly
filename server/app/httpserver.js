"use strict";

const express = require("express")();
const http = require("http");
const https = require("https");
const cors = require("cors")();
const proxySetup = require("./proxySetup");
const fs = require("fs");
const path = require("path");

let certDir = path.join(__dirname, "../.cert");

let key = fs.readFileSync(certDir + "/key.pem");
let cert = fs.readFileSync(certDir + "/cert.pem");
let credentials = {
  key: key,
  cert: cert,
};

const tokenInfoController = require("./controllers/tokenInfo");

express.use(cors);

express.use("/tokenInfo", tokenInfoController);

proxySetup(express);

express.get("/", (req, res) => {
  res.send("Hello World.");
});

const server = http.createServer(express);
const serverSSL = https.createServer(credentials, express);

module.exports = { server, serverSSL };
