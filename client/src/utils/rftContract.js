import Web3 from "web3";
import rftABI from "./rftContractDef";
import { abi as nftABI } from "./nftContractDef";
import connectToMetamask from "./metamask";
import { approveTransferOfTokenFromNFTToRFT } from "./nftContract";
import { approveTransfer } from "./daiContract";

const startIco = async (
  days,
  nftContractAddress,
  rftContractAddress,
  tokenId
) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let web3 = new Web3(window.web3.currentProvider);
      let nftc = new web3.eth.Contract(nftABI, nftContractAddress);
      await approveTransferOfTokenFromNFTToRFT(
        nftc,
        rftContractAddress,
        tokenId
      );

      let rftc = new web3.eth.Contract(rftABI, rftContractAddress);
      await rftc.methods
        .startIco(days)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
        })
        .on("receipt", function (receipt) {
          console.log("receipt", receipt);
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt,
          // the second parameter will be the receipt.
          console.error("error", error);
          console.error("receipt", receipt);
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const buyIco = async (rftContractAddress, numberOfCoins, coinPrice) => {
  let { accounts } = await connectToMetamask(null);

  if (accounts.length) {
    try {
      let web3 = new Web3(window.web3.currentProvider);
      console.log("rftContractAddress", rftContractAddress);

      await approveTransfer(rftContractAddress, numberOfCoins * coinPrice);

      let rftc = new web3.eth.Contract(rftABI, rftContractAddress);
      await rftc.methods
        .buyShare(numberOfCoins)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
        })
        .on("receipt", function (receipt) {
          console.log("receipt", receipt);
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt,
          // the second parameter will be the receipt.
          console.error("error", error);
          console.error("receipt", receipt);
        });
      let balance = await rftc.methods.balanceOf(accounts[0]).call();
      return balance;
    } catch (error) {
      console.error(error);
    }
  }
};

export { startIco, buyIco };
