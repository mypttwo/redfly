import React from "react";
import IcoDataPage from "./icoDataPage";
import { ICOStatus, getICOStatus } from "../utils/contractDataReader";
import IcoStartForm from "./icoStartForm";
import IcoWithdrawForm from "./icoWithdrawForm";
import BuyCoinForm from "./buyCoinForm";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";
import Web3 from "web3";

export const PAGETYPE = {
  MARKETPLACE: 1,
  MANAGER: 2,
};

class IcoManager extends React.Component {
  state = {
    balance: "",
    totalSupply: "",
    rftc: null,
  };

  componentDidMount() {
    this.setState(
      {
        balance: "",
        totalSupply: "",
      },
      async () => await this.updateBalance()
    );
  }

  updateBalance = async () => {
    try {
      let { accounts } = await connectToMetamask(null);
      let web3 = new Web3(window.web3.currentProvider);
      let rftc = new web3.eth.Contract(rftABI, this.props.nft.rft.rftAddress);

      rftc.events.Bought(async (error, event) => {
        console.log("Bought!");
        let balance = await rftc.methods.balanceOf(accounts[0]).call();
        let totalSupply = await rftc.methods.totalSupply().call();
        console.log(this.props.nft.rft.rftAddress, balance);
        console.log(this.props.nft.rft.rftAddress, totalSupply);
        this.setState({
          balance: web3.utils.fromWei(balance),
          totalSupply: web3.utils.fromWei(totalSupply),
        });
      });

      let balance = await rftc.methods.balanceOf(accounts[0]).call();
      let totalSupply = await rftc.methods.totalSupply().call();

      this.setState({
        rftc: rftc,
        balance: web3.utils.fromWei(balance),
        totalSupply: web3.utils.fromWei(totalSupply),
      });
    } catch (error) {
      console.error("updateBalance", error);
    }
  };

  render() {
    let icoJSX = "";

    let icoStatus = getICOStatus(this.props.nft);

    switch (icoStatus) {
      case ICOStatus.PENDING:
        if (this.props.pageType == PAGETYPE.MANAGER) {
          icoJSX = <IcoStartForm nft={this.props.nft}></IcoStartForm>;
        } else {
          //icoJSX = <>Waiting...</>;
        }

        break;
      case ICOStatus.IN_PROGRESS:
        if (this.props.pageType == PAGETYPE.MANAGER) {
          icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
        } else {
          icoJSX = <BuyCoinForm nft={this.props.nft} />;
        }
        break;
      case ICOStatus.COMPLETED:
        if (this.props.pageType == PAGETYPE.MANAGER) {
          icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
        } else {
          //icoJSX = <>Waiting...</>;
        }
        break;
      case ICOStatus.NOT_INIT:
        if (this.props.pageType == PAGETYPE.MANAGER) {
          icoJSX = <></>;
        } else {
          //icoJSX = <>Waiting...</>;
        }
      default:
        break;
    }

    return (
      <React.Fragment>
        <IcoDataPage
          nft={this.props.nft}
          index={this.props.index}
          balance={this.state.balance}
          totalSupply={this.state.totalSupply}
        >
          {icoJSX}
        </IcoDataPage>
      </React.Fragment>
    );
  }
}

export default IcoManager;
