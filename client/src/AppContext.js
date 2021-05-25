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
    stylePath: "",
  };

  refreshSet = new Set();

  async componentDidMount() {
    try {
      let nftc = setupNFTContract(this.getNFTEventHandlers());
      let rftfc = setupRFTFactoryContract(this.getRFTFactoryEventHandlers());
      let accounts = await this.getAccountsFromMetamask();
      this.setState({
        nftc: nftc,
        rftfc: rftfc,
        accounts: accounts,
      });
      await this.refresh("start");
    } catch (error) {
      console.error(error);
    }
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

  refresh = async (transaction) => {
    if (this.refreshSet.has(transaction)) {
      return;
    } else {
      this.refreshSet.add(transaction);
      console.log("CALLING REFRESH");
      try {
        let nfts = await getMergedData(this.getRFTEventHandlers());
        EventEmitter.publish(DATA_LOADED_EVENT, nfts);
        this.setState({
          nfts: nfts,
        });
      } catch (error) {
        console.error("refresh", error);
      }
    }
  };

  registerForUpdates = (handler) => {
    EventEmitter.subscribe(DATA_LOADED_EVENT, handler);
  };

  setStylePath = (stylePath) => {
    this.setState({
      stylePath: stylePath,
    });
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
          stylePath: this.state.stylePath,
          setStylePath: this.setStylePath,
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

  handleNewRFT = async (error, event) => {
    if (error) {
      console.error("New RFT event", error);
    } else {
      console.log("handleNewRFT rft", event.returnValues.rft);
      console.log("handleNewRFT creator", event.returnValues.creator);
      console.log("handleNewRFT nft", event.returnValues.nft);
      console.log("handleNewRFT tokenId", event.returnValues.tokenId);

      // await this.refresh();
    }
  };

  getRFTFactoryEventHandlers = () => {
    return {
      handleNewRFT: this.handleNewRFT,
    };
  };

  handleFeesUpdated = (error, event) => {
    if (error) {
      console.error("FeesUpdated event", error);
    } else {
      console.log("fees", event.returnValues.fees);
    }
  };

  handleMinted = async (error, event) => {
    if (error) {
      console.error("Minted event", error);
    } else {
      console.log("handleMinted tokenId", event.returnValues.tokenId);
      console.log("handleMinted minter", event.returnValues.minter);
      // await this.refresh(tokenId.transactionHash);
    }
  };

  handleBurnt = async (error, event) => {
    if (error) {
      console.error("Burnt event", error);
    } else {
      console.log("handleBurnt tokenId", event.returnValues.tokenId);
      console.log("handleBurnt minter", event.returnValues.minter);
      // await this.refresh();
    }
  };

  handleTokenURIUpdated = (error, event) => {
    if (error) {
      console.error("TokenURIUpdated event", error);
    } else {
      console.log("handleTokenURIUpdated tokenId", event.returnValues.tokenId);
      console.log("handleTokenURIUpdated minter", event.returnValues.minter);
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
