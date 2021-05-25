import React from "react";
import mmlogo from "../metamask-fox.svg";
import logo from "../logo.svg";
import "../App.css";
import Marketplace from "./marketplace";
import Manager from "./manager";

import { getMaskedAddress } from "../utils/shorten";
import connectToMetamask from "../utils/metamask";
import Main from "./main";
import CreateNFT from "./createNft";
import { getNetworkId } from "../utils/network";
import MetamaskConnectWarning from "./metamaskConnectWarning";
import withAppContext from "../hocs/withAppContext";

import light from "../svg/moon-stars.svg";
import dark from "../svg/moon-stars-fill.svg";
import GetStarted from "./howToGetStarted";
import Withdraw from "./howToWithdraw";

export const MAIN = 0;
export const MARKET_PLACE = 1;
export const MANAGER = 2;
export const CREATENFT = 3;
export const HOW_TO_GET_STARTED = 4;
export const HOW_TO_WITHDRAW = 5;

class Home extends React.Component {
  state = {
    page: MARKET_PLACE,
    stylePath:
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css",
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

    if (this.state.page == MANAGER) {
      page = <Manager></Manager>;
      marketPlaceActive = "";
      managerActive = "text-decoration-underline";
      createNFTActive = "";
    }

    if (this.state.page == MAIN) {
      page = <Main gotoPage={this.gotoPage}></Main>;
      marketPlaceActive = "";
      managerActive = "";
      createNFTActive = "";
    }

    if (this.state.page == CREATENFT) {
      page = <CreateNFT></CreateNFT>;
      marketPlaceActive = "";
      managerActive = "";
      createNFTActive = "text-decoration-underline";
    }

    if (this.state.page == HOW_TO_GET_STARTED) {
      page = <GetStarted gotoPage={this.gotoPage} />;
      marketPlaceActive = "";
      managerActive = "";
      createNFTActive = "";
    }
    if (this.state.page == HOW_TO_WITHDRAW) {
      page = <Withdraw gotoPage={this.gotoPage} />;
      marketPlaceActive = "";
      managerActive = "";
      createNFTActive = "";
    }

    return { page, marketPlaceActive, managerActive, createNFTActive };
  };

  toggleDark = () => {
    let stylePath =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css";

    if (this.state.stylePath.includes("flatly")) {
      stylePath =
        "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css";
    }
    this.props.appContext.setStylePath(stylePath);
    this.setState({
      stylePath,
    });
  };

  render() {
    let { page, marketPlaceActive, managerActive, createNFTActive } =
      this.getPage();

    let darkModeJSX = (
      <div
        className="form-check form-switch mx-5 my-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Dark/Light mode"
      >
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeSwitch"
          onClick={this.toggleDark}
        />
        <label className="form-check-label text-secondary" for="darkModeSwitch">
          <img
            src={this.state.stylePath.includes("flatly") ? light : dark}
            alt="website"
          />
        </label>
      </div>
    );
    let accountsJSX = (
      <>
        <button
          className="btn btn-sm px-3 btn-outline-warning"
          type="button"
          onClick={this.setupMetamask}
        >
          <img src={mmlogo} className="mm-logo" alt="metamask" />
          Connect
        </button>
      </>
    );

    if (this.state.accounts.length) {
      accountsJSX = (
        <p className="btn-link pt-3" onClick={this.setupMetamask}>
          {getMaskedAddress(this.state.accounts[0])}
        </p>
      );
    }

    return (
      <div className="App">
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
        <nav
          className={`navbar navbar-expand-md shadow ${
            this.state.stylePath.includes("flatly")
              ? "navbar-light"
              : "navbar-dark"
          }  ${
            this.state.stylePath.includes("flatly") ? "bg-light" : "bg-dark"
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
                    title="Marketplace"
                  >
                    Marketplace
                  </button>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle show"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    How to...
                  </a>
                  <div class="dropdown-menu" data-bs-popper="none">
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => this.gotoPage(HOW_TO_GET_STARTED)}
                    >
                      Create an NFT and mint your own Coin
                    </a>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => this.gotoPage(HOW_TO_WITHDRAW)}
                    >
                      Withdraw earnings from your Coin
                    </a>
                  </div>
                </li>
              </ul>
              <form className="d-flex">{darkModeJSX}</form>
              <form className="d-flex  mr-3">
                <button
                  type="button"
                  className={`btn btn-success  ${createNFTActive}`}
                  onClick={() => this.gotoPage(CREATENFT)}
                >
                  Create NFT
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
              <form className="mx-3">{this.state.network}</form>
              <form className="d-flex">{accountsJSX}</form>
            </div>
          </div>
        </nav>
        {/* <div className="container">
          <MetamaskConnectWarning></MetamaskConnectWarning>
        </div> */}
        <div className="mt-4">{page}</div>
        <footer class="text-muted py-5">
          <div class="container">
            <p class="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
            <p class="mb-1">© Red Fly 2017–2021</p>
            <p class="mb-0"></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default withAppContext(Home);
