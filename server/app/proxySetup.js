"use strict";

const proxy = require("express-http-proxy");

const proxySetup = (express) => {
  express.use(
    "/ipfs/",
    proxy("https://gateway.pinata.cloud/ipfs/", {
      proxyReqPathResolver: (req) => {
        let parts = req.url.split("?");
        let queryString = parts[1];
        console.log(queryString);
        return queryString;
      },
    })
  );
};

module.exports = proxySetup;
