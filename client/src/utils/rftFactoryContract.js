import Web3 from "web3";
import { abi, address } from "./rftFactoryContractDef";
import connectToMetamask from "./metamask";

const setupRFTFactoryContract = (eventHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let rftfc = new web3.eth.Contract(abi, address);

  //setup events here
  rftfc.events.NewRFT(async (error, event) => {
    if (eventHandler && eventHandler.handleNewRFT) {
      eventHandler.handleNewRFT(error, event);
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
  icoTokenPrice,
  icoTokenSupply,
  icoTokenReserve,
  recieptHandler
) => {
  try {
    let { accounts } = await connectToMetamask(null);
    let web3 = new Web3(window.web3.currentProvider);

    rftfc.methods
      .createToken(
        name,
        symbol,
        nftAddress,
        nftTokenId,
        icoTokenPrice,
        web3.utils.toWei(`${icoTokenSupply}`),
        web3.utils.toWei(`${icoTokenReserve}`)
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

// const getRFTAddressList = async () => {
//   try {
//     let rftfc = setupRFTFactoryContract(null);
//     let rftAddressList = await rftfc.methods.getRFTs().call();
//     return rftAddressList;
//   } catch (error) {
//     console.error(error);
//   }
// };

export { setupRFTFactoryContract, createRFT /*, getRFTAddressList*/ };
