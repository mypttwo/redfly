import React from "react";
import mmlogo from "../metamask-fox.svg";
import logo from "../logo.svg";
import "../App.css";
import Marketplace from "./marketplace";
import Manager from "./manager";

import { getMaskedAddress } from "../utils/shorten";
import connectToMetamask from "../utils/metamask";
import Main from "./main";
import Portfolio from "./portfolio";

export const MAIN = 0;
export const MARKET_PLACE = 1;
export const MANAGER = 2;
export const PORTFOLIO = 3;

class Home extends React.Component {
  state = {
    page: MAIN,
    stylePath:
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/slate/bootstrap.min.css",
    accounts: [],
  };

  gotoPage = (page) => {
    this.setState({
      page: page,
    });
  };

  componentDidMount() {}
  setupMetamask = async () => {
    try {
      let emptyAccounts = () => this.setState({ accounts: [] });
      let { accounts } = await connectToMetamask(emptyAccounts);
      this.setState({
        accounts: accounts,
      });
    } catch (error) {
      console.error(error);
    }
  };

  getPage = () => {
    let page = <Marketplace></Marketplace>;
    let marketPlaceActive = "text-decoration-underline";
    let publishActive = "";
    let portActive = "";
    if (this.state.page == MANAGER) {
      page = <Manager></Manager>;
      marketPlaceActive = "";
      publishActive = "text-decoration-underline";
      portActive = "";
    }

    if (this.state.page == MAIN) {
      page = <Main gotoPage={this.gotoPage}></Main>;
      marketPlaceActive = "";
      publishActive = "";
      portActive = "";
    }

    if (this.state.page == PORTFOLIO) {
      page = <Portfolio></Portfolio>;
      marketPlaceActive = "";
      publishActive = "";
      portActive = "text-decoration-underline";
    }

    return { page, marketPlaceActive, publishActive, portActive };
  };

  render() {
    let { page, marketPlaceActive, publishActive, portActive } = this.getPage();

    let accountsJSX = (
      <button
        className="btn btn-sm px-3 btn-outline-warning"
        type="button"
        onClick={this.setupMetamask}
      >
        <img src={mmlogo} className="mm-logo" alt="metamask" />
        Connect
      </button>
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
        <nav className="navbar navbar-expand-md shadow navbar-dark bg-dark fixed-top font-monospace text-info">
          <div className="container-fluid">
            <div
              className="navbar-brand border-0 text-warning"
              onClick={() => this.gotoPage(MAIN)}
            >
              <a href="#" className="navbar-brand border-0 text-warning">
                <img src={logo} className="mm-logo" alt="red fly" />
                Red Fly
              </a>
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
                    className={`btn btn-link border-0 ${marketPlaceActive}`}
                    onClick={() => this.gotoPage(MARKET_PLACE)}
                  >
                    Marketplace
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-link border-0  ${publishActive}`}
                    onClick={() => this.gotoPage(MANAGER)}
                  >
                    Manage my NFTs/ICOs
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-link border-0  ${portActive}`}
                    onClick={() => this.gotoPage(PORTFOLIO)}
                  >
                    Portfolio
                  </button>
                </li>
              </ul>
              <form className="d-flex">{accountsJSX}</form>
            </div>
          </div>
        </nav>
        <div>{page}</div>
      </div>
    );
  }
}

export default Home;
