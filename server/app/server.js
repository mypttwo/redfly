"use strict";

const { dbConnStr, port } = require("./config");
const mongoose = require("mongoose");
const server = require("./httpserver");

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
  })
  .catch((error) => {
    console.error(`Server is shutting down. Could not connect to db ${error}`);
    process.exit(0);
  });
