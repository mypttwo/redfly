import React from "react";
import Web3 from "web3";
import { ICOStatus, getICOStatus } from "../utils/contractDataReader";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";

class IcoDataPage extends React.Component {
  state = {
    balance: 0,
    rftc: null,
    accounts: [],
  };

  async componentDidMount() {
    let { accounts } = await connectToMetamask(null);
    let web3 = new Web3(window.web3.currentProvider);
    let rftc = new web3.eth.Contract(rftABI, this.props.nft.rft.rftAddress);

    rftc.events.Bought(async (error, event) => {
      let balance = await rftc.methods.balanceOf(accounts[0]).call();
      let totalSupply = await rftc.methods.totalSupply().call();
      this.setState({ balance: balance, totalSupply: totalSupply });
    });

    let balance = await rftc.methods.balanceOf(accounts[0]).call();
    let totalSupply = await rftc.methods.totalSupply().call();
    this.setState({
      accounts: accounts,
      rftc: rftc,
      balance: balance,
      totalSupply: totalSupply,
    });
  }

  getICOStatusJSX = (nft) => {
    let icoStatus = getICOStatus(nft);
    let icoStatusJSX = "";
    switch (icoStatus) {
      case ICOStatus.NOT_INIT:
        break;
      case ICOStatus.PENDING:
        icoStatusJSX = (
          <li className="list-group-item d-flex justify-content-between align-items-center text-warning">
            The ICO has not yet started
          </li>
        );
        break;
      case ICOStatus.IN_PROGRESS:
        icoStatusJSX = (
          <li className="list-group-item d-flex justify-content-between align-items-center text-info">
            ICO End Date
            <span className="text-info">
              {nft.rft.icoEndDate.toDateString()}
            </span>
          </li>
        );
        break;
      case ICOStatus.COMPLETED:
        break;
      default:
        break;
    }
    return icoStatusJSX;
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Name
              <span className="text-info">{this.props.nft.rft.name}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Symbol
              <span className="text-info">{this.props.nft.rft.symbol}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Price in DAI
              <span className="text-info">{this.props.nft.rft.tokenPrice}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Issued
              <span className="text-info">
                {this.props.nft.rft.tokenSupply}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Reserved
              <span className="text-info">
                {this.props.nft.rft.tokenReserve}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              Sold
              <span className="text-info">{this.state.totalSupply}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center text-info">
              You own
              <span className="text-info">{this.state.balance}</span>
            </li>
            {this.getICOStatusJSX(this.props.nft)}
          </ul>
          {this.props.children}
        </form>
      </React.Fragment>
    );
  }
}

export default IcoDataPage;
