import React from "react";
import logo from "../logo.svg";
import mmlogo from "../metamask-fox.svg";
import { getMaskedAddress } from "../utils/shorten";
import connectToMetamask from "../utils/metamask";
import pages from "./pages";

class DashboardHeader extends React.Component {
  connectToMetamask = async () => {
    let emptyAccounts = () =>
      this.props.updateAccounts({ provider: null, accounts: [] });
    let { provider, accounts } = await connectToMetamask(emptyAccounts);
    this.props.updateAccounts({ provider, accounts });
  };

  getAccountsJSX = () => {
    let accountsJSX = (
      <button
        className="btn px-3 btn-outline-warning"
        type="button"
        onClick={this.connectToMetamask}
      >
        <img src={mmlogo} className="mm-logo" alt="metamask" />
        Connect
      </button>
    );

    let accounts = this.props.getAccounts();
    if (accounts.length) {
      accountsJSX = (
        <p className="btn-link pt-3" onClick={this.connectToMetamask}>
          {getMaskedAddress(accounts[0])}
        </p>
      );
    }
    return accountsJSX;
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top font-monospace text-info">
        <div className="container-fluid">
          <button className="navbar-brand btn btn-link">
            <img src={logo} className="mm-logo" alt="metamask" />
            Re Fung This
          </button>
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
                  className={`btn btn-link `}
                  aria-current="page"
                  onClick={() => this.props.updatePage(pages.NFT)}
                >
                  NFT
                </button>
              </li>
              <li className={`nav-item `}>
                <button
                  className="btn btn-link"
                  onClick={() => this.props.updatePage(pages.RFT)}
                >
                  RFTs
                </button>
              </li>
            </ul>
            <form className="d-flex">{this.getAccountsJSX()}</form>
          </div>
        </div>
      </nav>
    );
  }
}

export default DashboardHeader;
