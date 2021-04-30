"use strict";

const fs = require("fs");

fs.readFile("./build/contracts/RFT.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let jsonData = JSON.parse(data);
    fs.writeFileSync("abi.js", `const abi = ${JSON.stringify(jsonData.abi)};`);
  }
});
