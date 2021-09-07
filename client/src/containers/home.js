import React from "react";
import mmlogo from "../metamask-fox.svg";
import logo from "../logo.svg";
import "../App.css";
import Marketplace from "./marketplaceWithPagination";
import Manager from "./manager";

import connectToMetamask from "../utils/metamask";
import Main from "./main";
import CreateNFT from "./createNft";
import ImportNFT from "./nftImportWithPagination";
import { getNetworkId } from "../utils/network";
import withAppContext from "../hocs/withAppContext";

import GetStarted from "./howToGetStarted";
import Withdraw from "./howToWithdraw";

import WallectConnect from "./walletConnect";
import ToggleDark from "./toggleDark";

export const MAIN = 0;
export const MARKET_PLACE = 1;
export const MANAGER = 2;
export const CREATENFT = 3;
export const HOW_TO_GET_STARTED = 4;
export const HOW_TO_WITHDRAW = 5;
export const IMPORTNFT = 6;
export const CLASSIFIED = 7;

class Home extends React.Component {
  state = {
    page: MARKET_PLACE,
    accounts: [],
    network: "",
  };

  gotoPage = (page) => {
    this.setState({
      page: page,
    });
  };

  componentDidMount() {
    this.setupMetamask();
  }

  networkMessage = "Please change to Kovan";

  handleNetworkChange = (network) => {
    let networkMessage = "";
    if (network != getNetworkId()) {
      networkMessage = this.networkMessage;
    }
    this.setState({
      network: networkMessage,
    });
  };

  handleAccountsChange = (result) => {
    console.log("handleAccountsChange", result);
  };
  setupMetamask = async () => {
    try {
      let { accounts, network } = await connectToMetamask(
        this.handleAccountsChange,
        this.handleNetworkChange
      );
      let networkMessage = "";
      if (network != getNetworkId()) {
        networkMessage = this.networkMessage;
      }
      this.setState({
        accounts: accounts,
        network: networkMessage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  getPage = () => {
    let page = <Marketplace></Marketplace>;
    let marketPlaceActive = "text-decoration-underline";
    let managerActive = "";
    let createNFTActive = "";
    let importNFTActive = "";
    let classifiedActive = "";

    let reset = () => {
      marketPlaceActive = "";
      managerActive = "";
      createNFTActive = "";
      importNFTActive = "";
      classifiedActive = "";
    };

    if (this.state.page == MANAGER) {
      page = <Manager></Manager>;
      reset();
      managerActive = "text-decoration-underline";
    }

    if (this.state.page == MAIN) {
      page = <Main gotoPage={this.gotoPage}></Main>;
      reset();
    }

    if (this.state.page == CREATENFT) {
      page = <CreateNFT></CreateNFT>;
      reset();
      createNFTActive = "text-decoration-underline";
    }

    if (this.state.page == IMPORTNFT) {
      page = <ImportNFT></ImportNFT>;
      reset();
      importNFTActive = "text-decoration-underline";
    }

    if (this.state.page == HOW_TO_GET_STARTED) {
      page = <GetStarted gotoPage={this.gotoPage} />;
      reset();
    }
    if (this.state.page == HOW_TO_WITHDRAW) {
      page = <Withdraw gotoPage={this.gotoPage} />;
      reset();
    }

    return {
      page,
      marketPlaceActive,
      managerActive,
      createNFTActive,
      importNFTActive,
      // classifiedActive,
    };
  };

  render() {
    let {
      page,
      marketPlaceActive,
      managerActive,
      createNFTActive,
      importNFTActive,
      // classifiedActive,
    } = this.getPage();

    return (
      <div className="App">
        <nav
          className={`navbar navbar-expand-md shadow ${
            this.props.appContext.stylePath.includes("flatly")
              ? "navbar-light"
              : "navbar-dark"
          }  ${
            this.props.appContext.stylePath.includes("flatly")
              ? "bg-light"
              : "bg-dark"
          } fixed-top font-monospace text-info`}
        >
          <div className="container-fluid">
            <div
              role="button"
              className="navbar-brand border-0 text-warning btn-link"
              onClick={() => this.gotoPage(MAIN)}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Red Fly"
            >
              {/* <a href="#" className="navbar-brand border-0 text-warning"> */}
              <img src={logo} className="mm-logo" alt="red fly" />
              Red Fly
              {/* </a> */}
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <button
                    className={`btn btn-link  border-0 ${marketPlaceActive}`}
                    onClick={() => this.gotoPage(MARKET_PLACE)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="ICO Marketplace"
                  >
                    ICO Marketplace
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle show opaque"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    How to...
                  </a>
                  <div className="dropdown-menu" data-bs-popper="none">
                    <div
                      className="dropdown-item opaque"
                      href="#"
                      onClick={() => this.gotoPage(HOW_TO_GET_STARTED)}
                    >
                      Create an NFT and mint your own Coin
                    </div>
                    <a
                      className="dropdown-item opaque"
                      href="#"
                      onClick={() => this.gotoPage(HOW_TO_WITHDRAW)}
                    >
                      Withdraw earnings from your Coin
                    </a>
                  </div>
                </li>
              </ul>
              <form className="d-flex">
                <ToggleDark></ToggleDark>
              </form>
              <form className="d-flex my-1 mr-3">
                <button
                  type="button"
                  className={`btn btn-success  ${createNFTActive}`}
                  onClick={() => this.gotoPage(CREATENFT)}
                >
                  Create NFT
                </button>
              </form>
              <form className="d-flex my-1 mr-3">
                <button
                  type="button"
                  className={`btn btn-success  ${importNFTActive}`}
                  onClick={() => this.gotoPage(IMPORTNFT)}
                >
                  Import NFT
                </button>
              </form>
              <form className="d-flex">
                <button
                  type="button"
                  className={`btn btn-link border-0  ${managerActive}`}
                  onClick={() => this.gotoPage(MANAGER)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Dashboard for your NFTs, ICOs and withdrawals"
                >
                  ICO Dashboard
                </button>
              </form>
              <WallectConnect></WallectConnect>
            </div>
          </div>
        </nav>
        <div className="mt-4">{page}</div>
        <footer className="text-muted py-5">
          <div className="container">
            <p className="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
            <p className="mb-1">© Red Fly 2017–2021</p>
            <p className="mb-0"></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default withAppContext(Home);
