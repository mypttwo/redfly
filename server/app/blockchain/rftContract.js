"use strict";

const { network } = require("../config");
const Web3 = require("web3");
const { createRFTObj } = require("./createObj");

const abi = require("./rftContractDef");

const readRFTData = (value, web3) => {
  //set end date
  let icoEndDate = 0;
  if (value[8] != 0) {
    icoEndDate = new Date(value[8] * 1000);
  }

  //Create rft object
  let rft = createRFTObj(
    value[0],
    value[1],
    value[9],
    value[2],
    value[3],
    value[4],
    value[5],
    web3.utils.fromWei(value[6]),
    web3.utils.fromWei(value[7]),
    icoEndDate,
    value[10]
  );

  return rft;
};

const getRFTData = async (rftAddress) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network));
  let rftc = new web3.eth.Contract(abi, rftAddress);
  let res = await rftc.methods.getData().call();
  let rft = readRFTData(res, web3);
  return rft;
};

const getRFTDataList = async (rftAddressList) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network));

  let start = Date.now();
  if (Array.isArray(rftAddressList)) {
    let rftDataPromises = rftAddressList.map((rftAddress) => {
      let rftc = new web3.eth.Contract(abi, rftAddress);
      let res = rftc.methods.getData().call();
      return res;
    });
    return Promise.all(rftDataPromises).then((values) => {
      let rfts = values.map((value) => {
        return readRFTData(value, web3);
      });
      let end = Date.now();
      console.log(`reading RFTs Execution time: ${end - start} ms`);
      return rfts;
    });
  }

  return [];
};

const getRFTDataListWithoutCheck = async (rftAddressList) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network));

  let start = Date.now();
  if (Array.isArray(rftAddressList)) {
    let rftDataPromises = rftAddressList.map((rftAddress) => {
      let rftc = new web3.eth.Contract(abi, rftAddress);
      let res = rftc.methods.getData().call();
      return res;
    });
    return Promise.all(rftDataPromises).then((values) => {
      let rfts = values.map((value) => {
        return readRFTData(value, web3);
      });
      let end = Date.now();
      console.log(`reading RFTs Execution time: ${end - start} ms`);
      return rfts;
    });
  }

  return [];
};

module.exports = { getRFTData, getRFTDataList };
