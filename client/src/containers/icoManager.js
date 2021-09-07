import React from "react";
import IcoDataPage from "./icoDataPage";
import {
  ICOStatus,
  getICOStatus,
  getICOStatusByIcoEndDate,
} from "../utils/contractDataReader";
import IcoStartForm from "./icoStartForm";
import IcoWithdrawForm from "./icoWithdrawForm";
// import ICOClassifiedMain from "./icoClassifiedMain";
import BuyCoinForm from "./buyCoinForm";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";
import Web3 from "web3";

export const PAGETYPE = {
  MARKETPLACE: 1,
  MANAGER: 2,
  VIEW: 3,
};

class IcoManager extends React.Component {
  state = {
    balance: "",
    totalSupply: "",
    icoEndDate: "",
    rftc: null,
  };

  componentDidMount() {
    this.setState(
      {
        balance: "",
        totalSupply: "",
      },
      async () => await this.updateIcoData()
    );
  }

  updateIcoData = async () => {
    try {
      let { accounts } = await connectToMetamask(null);
      let web3 = new Web3(window.web3.currentProvider);
      let rftc = new web3.eth.Contract(
        rftABI,
        this.props.nft.rft.rftContractAddress
      );

      rftc.events.ICOStarted(async (error, event) => {
        if (error) {
          console.error("ICOStarted", error);
          return;
        }
        console.log("ICOStarted!");
        if (event.returnValues && event.returnValues.icoEnd) {
          //set end date
          let icoEndDate = 0;
          if (event.returnValues.icoEnd != 0) {
            icoEndDate = new Date(event.returnValues.icoEnd * 1000);
            this.setState({
              icoEndDate: icoEndDate,
            });
          }
        }
      });

      rftc.events.Bought(async (error, event) => {
        console.log("Bought!");
        let balance = await rftc.methods.balanceOf(accounts[0]).call();
        let totalSupply = await rftc.methods.totalSupply().call();

        this.setState({
          balance: web3.utils.fromWei(balance),
          totalSupply: web3.utils.fromWei(totalSupply),
        });
      });

      let balance = await rftc.methods.balanceOf(accounts[0]).call();
      let totalSupply = await rftc.methods.totalSupply().call();
      let icoEnd = await rftc.methods.icoEnd().call();
      let icoEndDate = 0;
      if (icoEnd != 0) {
        icoEndDate = new Date(icoEnd * 1000);
        this.setState({
          icoEndDate: icoEndDate,
        });
      }

      this.setState({
        rftc: rftc,
        balance: web3.utils.fromWei(balance),
        totalSupply: web3.utils.fromWei(totalSupply),
        icoEndDate: icoEndDate,
      });
    } catch (error) {
      console.error("updateIcoData", error);
    }
  };

  render() {
    let icoJSX = "";

    let icoStatus = getICOStatusByIcoEndDate(this.state.icoEndDate);

    switch (icoStatus) {
      case ICOStatus.PENDING:
        switch (this.props.pageType) {
          case PAGETYPE.MANAGER:
            icoJSX = <IcoStartForm nft={this.props.nft}></IcoStartForm>;
            break;
          case PAGETYPE.MARKETPLACE:
            break;
          case PAGETYPE.VIEW:
            break;
          default:
            break;
        }
        // if (this.props.pageType == PAGETYPE.MANAGER) {
        //   icoJSX = <IcoStartForm nft={this.props.nft}></IcoStartForm>;
        // } else {
        //   //icoJSX = <>Waiting...</>;
        // }

        break;
      case ICOStatus.IN_PROGRESS:
        switch (this.props.pageType) {
          case PAGETYPE.MANAGER:
            icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
            break;
          case PAGETYPE.MARKETPLACE:
            icoJSX = <BuyCoinForm nft={this.props.nft} />;
            break;
          case PAGETYPE.VIEW:
            break;
          default:
            break;
        }
        // if (this.props.pageType == PAGETYPE.MANAGER) {
        //   icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
        // } else {
        //   icoJSX = <BuyCoinForm nft={this.props.nft} />;
        // }
        break;
      case ICOStatus.COMPLETED:
        switch (this.props.pageType) {
          case PAGETYPE.MANAGER:
            icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
            break;
          case PAGETYPE.MARKETPLACE:
            icoJSX = (
              <div className="container">
                <div className="row pb-3">
                  <div className="col">
                    <a
                      href="#"
                      class="icon-link"
                      onClick={() =>
                        this.props.displayClassifieds(this.props.nft)
                      }
                    >
                      Trade
                    </a>
                  </div>
                </div>
              </div>
            );
            break;
          case PAGETYPE.VIEW:
            break;
          default:
            break;
        }
        // if (this.props.pageType == PAGETYPE.MANAGER) {
        //   icoJSX = <IcoWithdrawForm nft={this.props.nft}></IcoWithdrawForm>;
        // } else {
        //   icoJSX = <ICOClassifiedMain nft={this.props.nft}></ICOClassifiedMain>;
        // }
        break;
      case ICOStatus.NOT_INIT:
      case ICOStatus.COMPLETED:
        switch (this.props.pageType) {
          case PAGETYPE.MANAGER:
            break;
          case PAGETYPE.MARKETPLACE:
            break;
          case PAGETYPE.VIEW:
            break;
          default:
            break;
        }
      // if (this.props.pageType == PAGETYPE.MANAGER) {
      //   icoJSX = <></>;
      // } else {
      //   //icoJSX = <>Waiting...</>;
      // }
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
          icoEndDate={this.state.icoEndDate}
        >
          {icoJSX}
        </IcoDataPage>
      </React.Fragment>
    );
  }
}

export default IcoManager;
