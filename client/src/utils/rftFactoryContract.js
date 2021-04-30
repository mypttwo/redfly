import Web3 from "web3";
import { abi, address } from "./rftFactoryContractDef";
import rftABI from "./rftContractDef";
import connectToMetamask from "./metamask";

const setupRFTFactoryContract = (eventHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let rftfc = new web3.eth.Contract(abi, address);

  //setup events here
  rftfc.events.NewRFT(async (error, event) => {
    if (eventHandler && eventHandler.handleNewRFT) {
      eventHandler.handleNewRFT(
        null,
        event.returnValues.rft,
        event.returnValues.creator,
        event.returnValues.nft,
        event.returnValues.tokenId
      );
    }
  });

  return rftfc;
};

const createRFT = async (
  rftfc,
  name,
  symbol,
  nftAddress,
  nftTokenId,
  icoSharePrice,
  icoShareSupply,
  icoShareReserve,
  recieptHandler
) => {
  try {
    let { accounts } = await connectToMetamask(null);
    rftfc.methods
      .createToken(
        name,
        symbol,
        nftAddress,
        nftTokenId,
        icoSharePrice,
        icoShareSupply,
        icoShareReserve
      )
      .send({ from: accounts[0] })
      .on("transactionHash", function (hash) {
        console.log("transactionHash", hash);
      })
      .on("receipt", function (receipt) {
        console.log("receipt", receipt);
        recieptHandler(null, receipt);
      })
      .on("error", function (error, receipt) {
        console.log("error", error);
        console.log("error receipt", receipt);
        recieptHandler(error, receipt);
      });
  } catch (error) {
    console.error(error);
  }
};

const getRFTs = async (rftfc, rftEventHandler) => {
  try {
    let { accounts } = await connectToMetamask(null);
    let r = await rftfc.methods.getRFTs().call({ from: accounts[0] });

    if (r.length) {
      let web3 = new Web3(window.web3.currentProvider);
      let rftc = new web3.eth.Contract(rftABI, r[0]);
      rftc.events.ICOStarted(async (error, event) => {
        if (rftEventHandler && rftEventHandler.handleICOStarted) {
          rftEventHandler.handleICOStarted(
            error,
            event.returnValues.nftAddress,
            event.returnValues.tokenId,
            event.returnValues.rftAddress,
            event.returnValues.name,
            event.returnValues.symbol,
            event.returnValues.icoSharePrice,
            event.returnValues.icoShareSupply,
            event.returnValues.icoShareReserve,
            event.returnValues.icoEnd,
            event.returnValues.owner
          );
        }
      });
      rftc.events.Bought(async (error, event) => {
        if (rftEventHandler && rftEventHandler.handleBought) {
          rftEventHandler.handleBought(
            error,
            event.returnValues.nftAddress,
            event.returnValues.tokenId,
            event.returnValues.rftAddress,
            event.returnValues.name,
            event.returnValues.symbol,
            event.returnValues.buyerAddress,
            event.returnValues.shareAmount
          );
        }
      });
    }

    return r;
  } catch (error) {
    console.error(error);
  }
};

export { setupRFTFactoryContract, createRFT, getRFTs };
