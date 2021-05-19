const pinataSDK = require("@pinata/sdk");
const { ipfsKey, ipfsSecretKey } = require("./app/config");
const pinata = pinataSDK(ipfsKey, ipfsSecretKey);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const unpin = async (pinlist, index) => {
  if (index >= pinlist.length) {
    return;
  }
  pinata
    .unpin(pinlist[index])
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });

  await sleep(1000);
  unpin(pinlist, ++index);
};

let fs = require("fs");
fs.readFile("htmlList", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  let urlRegex = /(https?:\/\/[^ ]*)/g;

  let urlList = data.match(urlRegex);

  let pinlist = urlList.map((url) =>
    url.replace("https://gateway.pinata.cloud/ipfs/", "").replace('"', "")
  );

  unpin(pinlist, 0);
});
