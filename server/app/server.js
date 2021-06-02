"use strict";

const { dbConnStr, port, portSSL } = require("./config");
const mongoose = require("mongoose");
const { server, serverSSL } = require("./httpserver");

mongoose
  .connect(dbConnStr)
  .then(() => {
    console.log(`Connected to db`);
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
  })
  .catch((error) => {
    console.error(`Server is shutting down. Could not connect to db ${error}`);
    process.exit(0);
  });
