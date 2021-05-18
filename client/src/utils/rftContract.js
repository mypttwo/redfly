import Web3 from "web3";
import rftABI from "./rftContractDef";

import connectToMetamask from "./metamask";

const startIco = async (days, rftContractAddress, recieptHandler) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let web3 = new Web3(window.web3.currentProvider);

      let rftc = new web3.eth.Contract(rftABI, rftContractAddress);
      await rftc.methods
        .startIco(days)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
        })
        .on("receipt", function (receipt) {
          if (recieptHandler) {
            recieptHandler(null, receipt);
          } else {
            console.log("receipt", receipt);
          }
        })
        .on("error", function (error, receipt) {
          if (recieptHandler) {
            recieptHandler(error, receipt);
          } else {
            console.log("error :" + error);
            console.log("receipt :" + JSON.stringify(receipt));
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const withdrawDai = async (amount, rftContractAddress, recieptHandler) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let web3 = new Web3(window.web3.currentProvider);

      let rftc = new web3.eth.Contract(rftABI, rftContractAddress);
      await rftc.methods
        .withdrawDai(amount)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
        })
        .on("receipt", function (receipt) {
          if (recieptHandler) {
            recieptHandler(null, receipt);
          } else {
            console.log("receipt", receipt);
          }
        })
        .on("error", function (error, receipt) {
          if (recieptHandler) {
            recieptHandler(error, receipt);
          } else {
            console.log("error :" + error);
            console.log("receipt :" + JSON.stringify(receipt));
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const buyIco = async (rftContractAddress, numberOfCoins, recieptHandler) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let web3 = new Web3(window.web3.currentProvider);

      let rftc = new web3.eth.Contract(rftABI, rftContractAddress);
      await rftc.methods
        .buyShare(numberOfCoins)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
        })
        .on("receipt", function (receipt) {
          if (recieptHandler) {
            recieptHandler(null, receipt);
          } else console.log("receipt :" + JSON.stringify(receipt));
        })
        .on("error", function (error, receipt) {
          if (recieptHandler) {
            recieptHandler(error, receipt);
          } else {
            console.log("error :" + error);
            console.log("receipt :" + JSON.stringify(receipt));
          }
        });
      let balance = await rftc.methods.balanceOf(accounts[0]).call();
      return balance;
    } catch (error) {
      console.error(error);
    }
  }
};

export { startIco, buyIco, withdrawDai };
