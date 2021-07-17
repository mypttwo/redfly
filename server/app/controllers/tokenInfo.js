"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors")();

const { ipfsKey, ipfsSecretKey } = require("../config");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(ipfsKey, ipfsSecretKey);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors);

router.post("", (req, res) => {
  if (!req.body.name) {
    return res.status(405).send("name not available");
  }
  if (!req.body.image) {
    return res.status(405).send("image url not available");
  }
  if (!req.body.description) {
    return res.status(405).send("description not available");
  }

  let tokenInfo = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    links: req.body.links,
  };

  pinata
    .pinJSONToIPFS(tokenInfo)
    .then((result) => {
      //handle results here
      console.log(result);
      return res.status(200).send(result.IpfsHash);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
