"use strict";

const getRFTAddressList = async (rftfc) => {
  try {
    console.log("getRFTAddressList");
    let rftAddressList = await rftfc.methods.getRFTs().call();
    return rftAddressList;
  } catch (error) {
    console.error(error);
  }
};

const setupRFTFactoryContract = (web3, abi, address, eventHandler) => {
  let rftfc = new web3.eth.Contract(abi, address);

  //setup events here
  rftfc.events.NewRFT(async (error, event) => {
    if (eventHandler && eventHandler.handleNewRFT) {
      eventHandler.handleNewRFT(error, event);
    }
  });

  return rftfc;
};

module.exports = { setupRFTFactoryContract, getRFTAddressList };
