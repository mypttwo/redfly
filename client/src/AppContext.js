import React from "react";
import { setupNFTContract } from "./utils/nftContract";
import { setupRFTFactoryContract } from "./utils/rftFactoryContract";

import {
  getBlockchainData,
  getBlockchainDataFromServerMintUpdate,
  getBlockchainDataFromServerNewIcoUpdate,
} from "./utils/serverBlockchainData";
import EventEmitter, { DATA_LOADED_EVENT } from "./eventEmitter";
import connectToMetamask from "./utils/metamask";
import delay from "./utils/delay";

export const AppContext = React.createContext({});

class AppContextProvider extends React.Component {
  state = {
    nftc: null,
    rftfc: null,
    accounts: [],
    stylePath: "",
    nftMap: new Map(),
    nftTokenDataMap: new Map(),
    loading: true,
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
        let { nftMap, nftTokenDataMap } = await getBlockchainData(
          this.state.nftMap,
          this.state.nftTokenDataMap
        );
        EventEmitter.publish(DATA_LOADED_EVENT, [...nftTokenDataMap.values()]);
        this.setState({
          nftMap: nftMap,
          nftTokenDataMap: nftTokenDataMap,
          loading: false,
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
          nfts: [...this.state.nftTokenDataMap.values()],
          nftTokenDataMap: this.state.nftTokenDataMap,
          nftMap: this.state.nftMap,
          registerForUpdates: this.registerForUpdates,
          nftc: this.state.nftc,
          rftfc: this.state.rftfc,
          accounts: this.state.accounts,
          stylePath: this.state.stylePath,
          setStylePath: this.setStylePath,
          loading: this.state.loading,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  handleNewRFT = async (error, event) => {
    if (error) {
      console.error("New RFT event", error);
    } else {
      console.log(JSON.stringify(event));
      if (event.returnValues && event.returnValues.rft) {
        console.log("handleNewRFT rft", event.returnValues.rft);
        if (this.refreshSet.has(event.transactionHash)) {
          return;
        } else {
          this.refreshSet.add(event.transactionHash);
          console.log("CALLING REFRESH");
          try {
            let { nftMap, nftTokenDataMap } =
              await getBlockchainDataFromServerNewIcoUpdate(
                event.returnValues.rft,
                this.state.nftMap,
                this.state.nftTokenDataMap
              );
            EventEmitter.publish(DATA_LOADED_EVENT, [
              ...nftTokenDataMap.values(),
            ]);
            this.setState({
              nftMap: nftMap,
              nftTokenDataMap: nftTokenDataMap,
              loading: false,
            });
          } catch (error) {
            console.error("refresh", error);
          }
        }
      }
    }
  };

  getRFTFactoryEventHandlers = () => {
    return {
      handleNewRFT: this.handleNewRFT,
    };
  };

  handleMinted = async (error, event) => {
    if (error) {
      console.error("Minted event", error);
    } else {
      console.log(JSON.stringify(event));
      if (event.returnValues && event.returnValues.tokenId) {
        console.log("handleMinted tokenId", event.returnValues.tokenId);
        if (this.refreshSet.has(event.transactionHash)) {
          return;
        } else {
          this.refreshSet.add(event.transactionHash);
          console.log("CALLING REFRESH for minted");
          try {
            delay(30 * 1000);
            let { nftMap, nftTokenDataMap } =
              await getBlockchainDataFromServerMintUpdate(
                event.returnValues.tokenId,
                this.state.nftMap,
                this.state.nftTokenDataMap
              );
            EventEmitter.publish(DATA_LOADED_EVENT, [
              ...nftTokenDataMap.values(),
            ]);
            this.setState({
              nftMap: nftMap,
              nftTokenDataMap: nftTokenDataMap,
              loading: false,
            });
          } catch (error) {
            console.error("refresh", error);
          }
        }
      }
    }
  };

  getNFTEventHandlers = () => {
    return {
      handleMinted: this.handleMinted,
    };
  };
}

export default AppContextProvider;
