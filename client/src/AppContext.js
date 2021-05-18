import React from "react";
import { setupNFTContract } from "./utils/nftContract";
import { setupRFTFactoryContract } from "./utils/rftFactoryContract";

import { getMergedData } from "./utils/contractData";
import EventEmitter, { DATA_LOADED_EVENT } from "./eventEmitter";
import connectToMetamask from "./utils/metamask";

export const AppContext = React.createContext({});

class AppContextProvider extends React.Component {
  state = {
    nfts: [],
    nftc: null,
    rftfc: null,
    accounts: [],
  };

  async componentDidMount() {
    let nftc = setupNFTContract(this.getNFTEventHandlers());
    let rftfc = setupRFTFactoryContract(this.getRFTFactoryEventHandlers());
    let accounts = await this.getAccountsFromMetamask();
    this.setState({
      nftc: nftc,
      rftfc: rftfc,
      accounts: accounts,
    });
    await this.refresh();
  }

  getAccountsFromMetamask = async () => {
    try {
      let emptyAccounts = () => this.setState({ accounts: [] });
      let { accounts } = await connectToMetamask(emptyAccounts);
      return accounts;
    } catch (error) {
      console.error(error);
    }
  };

  refresh = async () => {
    let nfts = await getMergedData(this.getRFTEventHandlers());
    EventEmitter.publish(DATA_LOADED_EVENT, nfts);
    this.setState({
      nfts: nfts,
    });
  };

  registerForUpdates = (handler) => {
    EventEmitter.subscribe(DATA_LOADED_EVENT, handler);
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          nfts: this.state.nfts,
          registerForUpdates: this.registerForUpdates,
          nftc: this.state.nftc,
          rftfc: this.state.rftfc,
          accounts: this.state.accounts,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  handleICOStarted = async (
    error,
    nftAddress,
    tokenId,
    rftAddress,
    name,
    symbol,
    icoSharePrice,
    icoShareSupply,
    icoShareReserve,
    icoEnd,
    owner
  ) => {
    if (error) {
      console.error("ICOStarted event", error);
    } else {
      console.log("ICOStarted event");
      console.log("tokenId", tokenId);
      console.log("rftAddress", rftAddress);
      console.log("name", name);
      console.log("symbol", symbol);
      console.log("icoSharePrice", icoSharePrice);
      console.log("icoShareSupply", icoShareSupply);
      console.log("icoShareReserve", icoShareReserve);
      console.log("icoEnd", icoEnd);
      console.log("owner", owner);
      await this.refresh();
    }
  };

  handleBought = async (
    error,
    nftAddress,
    tokenId,
    rftAddress,
    name,
    symbol,
    buyerAddress,
    shareAmount
  ) => {
    if (error) {
      console.error("Bought event", error);
    } else {
      console.log("Bought event");
      console.log("tokenId", tokenId);
      console.log("rftAddress", rftAddress);
      console.log("name", name);
      console.log("symbol", symbol);
      console.log("buyerAddress", buyerAddress);
      console.log("shareAmount", shareAmount);
      await this.refresh();
    }
  };

  getRFTEventHandlers = () => {
    return {
      handleICOStarted: this.handleICOStarted,
      handleBought: this.handleBought,
    };
  };

  handleNewRFT = async (error, rft, creator, nft, tokenId) => {
    if (error) {
      console.error("New RFT event", error);
    } else {
      console.log("rft", rft);
      await this.refresh();
    }
  };

  getRFTFactoryEventHandlers = () => {
    return {
      handleNewRFT: this.handleNewRFT,
    };
  };

  handleFeesUpdated = (error, fees) => {
    if (error) {
      console.error("FeesUpdated event", error);
    } else {
      console.log("fees", fees);
    }
  };

  handleMinted = async (error, tokenId, minter) => {
    if (error) {
      console.error("Minted event", error);
    } else {
      console.log("tokenId", tokenId);
      console.log("minter", minter);
      await this.refresh();
    }
  };

  handleBurnt = async (error, tokenId, minter) => {
    if (error) {
      console.error("Burnt event", error);
    } else {
      console.log("tokenId", tokenId);
      console.log("minter", minter);
      await this.refresh();
    }
  };

  handleTokenURIUpdated = (error, tokenId, minter) => {
    if (error) {
      console.error("TokenURIUpdated event", error);
    } else {
      console.log("tokenId", tokenId);
      console.log("minter", minter);
    }
  };

  handleCreateNFTReciept = (error, receipt) => {
    if (error) {
      console.error("CreateNFT ", error);
    } else {
      console.log(receipt.transactionHash);
      this.getNFTS();
    }
  };

  getNFTEventHandlers = () => {
    return {
      handleFeesUpdated: this.handleFeesUpdated,
      handleMinted: this.handleMinted,
      handleBurnt: this.handleBurnt,
      handleTokenURIUpdated: this.handleTokenURIUpdated,
    };
  };
}

export default AppContextProvider;
