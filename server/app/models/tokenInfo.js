"use strict";

const mongoose = require("mongoose");

let tokenInfoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  desc: {
    type: String,
  },
});

mongoose.model("TokenInfo", tokenInfoSchema);

module.exports = {
  TokenInfo: mongoose.model("TokenInfo"),
  tokenInfoSchema,
};
