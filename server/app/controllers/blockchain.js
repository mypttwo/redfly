"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors")();

const {
  getData,
  mintUpdate,
  newIcoUpdate,
  icoStartUpdate,
} = require("../blockchain/blockchain");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors);

router.get("", (req, res) => {
  getData()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.error("Error reading blockchain data", err);
      return res.status(500).send();
    });
});

router.post("/minted", (req, res) => {
  console.log(req.body);
  if (!req.body.nftContractAddress) {
    return res.status(400).send();
  }
  if (!req.body.tokenId) {
    return res.status(400).send();
  }
  mintUpdate(req.body.nftContractAddress, req.body.tokenId).then((data) => {
    return res.status(200).send(data);
  });
});

router.post("/newico", (req, res) => {
  console.log(req.body);
  if (!req.body.rftContractAddress) {
    return res.status(400).send();
  }

  newIcoUpdate(req.body.rftContractAddress).then((data) => {
    return res.status(200).send(data);
  });
});

router.post("/icostart", (req, res) => {
  console.log(req.body);
  if (!req.body.rftContractAddress) {
    return res.status(400).send();
  }

  icoStartUpdate(req.body.rftContractAddress).then((data) => {
    return res.status(200).send(data);
  });
});

module.exports = router;
