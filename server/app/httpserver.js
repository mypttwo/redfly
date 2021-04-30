"use strict";

const express = require("express")();
const http = require("http");
const cors = require("cors")();

const tokenInfoController = require("./controllers/tokenInfo");

express.use(cors);

express.use("/tokenInfo", tokenInfoController);

const server = http.createServer(express);

module.exports = server;
