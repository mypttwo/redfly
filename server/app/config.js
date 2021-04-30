"use strict";

require("dotenv").config();

const dbConnStr = process.env.DB_CONN_STR;
const port = process.env.PORT;

module.exports = {
  dbConnStr,
  port,
};
