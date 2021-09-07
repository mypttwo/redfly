"use strict";

const { dbConnStr, port, portSSL } = require("./config");
const mongoose = require("mongoose");
const { server, serverSSL } = require("./httpserver");
const { getData, readBlockchain } = require("./blockchain/blockchain");

const runApp = async () => {
  await getData();
  let minutes = 2;
  let interval = minutes * 60 * 1000;
  setInterval(async () => {
    try {
      await readBlockchain();
    } catch (error) {
      console.error(error);
    }
  }, interval);

  server.listen(port, (err) => {
    if (err) {
      console.error(err, `Shutting down server at ${port}`);
      process.exit(0);
    }
    console.log(`Server started at ${port}`);
  });
  serverSSL.listen(portSSL, (err) => {
    if (err) {
      console.error(err, `Shutting down SSL server at ${portSSL}`);
      process.exit(0);
    }
    console.log(`SSL Server started at ${portSSL}`);
  });
};

// mongoose
//   .connect(dbConnStr)
//   .then(async () => {
//     console.log(`Connected to db`);

//   })
//   .catch((error) => {
//     console.error(`Server is shutting down. Could not connect to db ${error}`);
//     process.exit(0);
//   });

runApp();
