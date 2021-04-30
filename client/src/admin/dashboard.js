import React from "react";
// import "./Admin.css";
import DashboardHeader from "./dashboardHeader";
import NFTAdmin from "./nfts";
import RFTAdmin from "./rfts";
import pages from "./pages";
import LoginAdmin from "./login";

class Dashboard extends React.Component {
  state = {
    stylePath:
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/slate/bootstrap.min.css",
    accounts: [],
    page: pages.Login,
    jwt: 8,
  };

  getPage = () => {
    return this.state.page;
  };

  updatePage = (page) => {
    if (this.state.jwt) {
      this.setState({
        page: page,
      });
    } else
      this.setState({
        page: pages.Login,
      });
  };

  updateAccounts = ({ provider, accounts }) => {
    console.log(accounts);
    this.setState({
      accounts: accounts,
    });
  };

  getAccounts = () => {
    return this.state.accounts;
  };

  getPage = () => {
    switch (this.state.page) {
      case pages.NFT:
        return <NFTAdmin></NFTAdmin>;
      case pages.RFT:
        return <RFTAdmin></RFTAdmin>;

      default:
        return <LoginAdmin></LoginAdmin>;
    }
  };

  render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
        <DashboardHeader
          updateAccounts={this.updateAccounts}
          getAccounts={this.getAccounts}
          getPage={this.getPage}
          updatePage={this.updatePage}
        ></DashboardHeader>
        {this.getPage()}
      </React.Fragment>
    );
  }
}

export default Dashboard;
