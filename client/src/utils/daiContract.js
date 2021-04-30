import Web3 from "web3";
import { address, abi } from "./daiContractDef";
import connectToMetamask from "./metamask";

const approveTransfer = async (rftAddress, value) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    let web3 = new Web3(window.web3.currentProvider);
    let dai = new web3.eth.Contract(abi, address);
    try {
      await dai.methods
        .approve(rftAddress, value)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("hash :" + hash);
        })
        .on("receipt", async function (receipt) {
          console.log("receipt :" + JSON.stringify(receipt));
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log("error :" + error);
          console.log("receipt :" + JSON.stringify(receipt));
        });

      let allowance = await dai.methods
        .allowance(accounts[0], rftAddress)
        .call();
      console.log("allowance", allowance);
    } catch (error) {
      console.error(error);
    }
  }
};

export { approveTransfer };
