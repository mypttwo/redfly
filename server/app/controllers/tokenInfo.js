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
    return res.status(405).send();
  }
  if (!req.body.url) {
    return res.status(405).send();
  }
  if (!req.body.desc) {
    return res.status(405).send();
  }

  let tokenInfo = {
    name: req.body.name,
    url: req.body.url,
    desc: req.body.desc,
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

// router.post("", (req, res) => {
//   if (!req.body.name) {
//     return res.status(405).send();
//   }
//   if (!req.body.url) {
//     return res.status(405).send();
//   }
//   if (!req.body.desc) {
//     return res.status(405).send();
//   }

//   TokenInfo.create({
//     name: req.body.name,
//     url: req.body.url,
//     desc: req.body.desc,
//   })
//     .then((data) => {
//       let tokenUri = `http://localhost:${port}/tokenInfo/${data.id}`;
//       return res.status(200).send(tokenUri);
//     })
//     .catch((error) => {
//       //https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
//       if (error.code == 11000) {
//         logger.error(`${error}`);
//         return res.status(406).send();
//       }
//       return res.status(500).send();
//     });
// });

// router.get("/:id", (req, res) => {
//   TokenInfo.findById(`${req.params.id}`)
//     .then((data) => {
//       let tokenInfo = {
//         name: data.name,
//         uri: data.url,
//         description: data.desc,
//       };
//       return res.status(200).send(tokenInfo);
//     })
//     .catch((error) => {
//       return res.status(500).send("Server Error");
//     });
// });

module.exports = router;
