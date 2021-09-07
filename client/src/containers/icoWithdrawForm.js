import React from "react";
import { getBalance } from "../utils/daiContract";
import { withdrawDai } from "../utils/rftContract";
import Loader from "react-loader-spinner";
import rftABI from "../utils/rftContractDef";
import connectToMetamask from "../utils/metamask";
import Web3 from "web3";

class IcoWithdrawForm extends React.Component {
  state = {
    balance: "",
    amount: "",
    statusMessage: "",
    enableActionButton: true,
  };

  async componentDidMount() {
    let balance = await getBalance(this.props.nft.rft.rftContractAddress);
    this.setupWithdrawListener();
    this.setState({
      balance,
      amount: balance,
    });
  }
  setupWithdrawListener = async () => {
    try {
      let web3 = new Web3(window.web3.currentProvider);
      let rftc = new web3.eth.Contract(
        rftABI,
        this.props.nft.rft.rftContractAddress
      );

      rftc.events.Bought(async (error, event) => {
        console.log("Bought!");
        let balance = await getBalance(this.props.nft.rft.rftContractAddress);
        this.setState({
          balance,
          amount: balance,
        });
      });
    } catch (error) {
      console.error("setupWithdrawListener", error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "amount":
        const regexp = new RegExp(`^-?[0-9]*$`);
        if (!regexp.test(value)) {
          isValid = false;
        }
        break;
      default:
        break;
    }
    if (isValid) {
      this.setState({
        [name]: value,
      });
    }
  };

  withdrawDaiRecieptHandler = async (error, reciept) => {
    if (error) {
      console.error(error);
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    } else {
      console.log(reciept);
      let balance = await getBalance(this.props.nft.rft.rftContractAddress);
      this.setState({
        statusMessage: "",
        enableActionButton: true,
        balance,
        amount: balance,
      });
    }
  };

  withdraw = async () => {
    console.log(this.state.amount);
    withdrawDai(
      this.state.amount,
      this.props.nft.rft.rftContractAddress,
      this.withdrawDaiRecieptHandler
    );
    this.setState({
      statusMessage: "Withdrawing DAI",
      enableActionButton: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container pb-3 ">
          <div className="row">
            <label className="col-sm-8 col-form-label">Balance in DAI</label>
            <div className="col-sm-4 mt-2">{this.state.balance}</div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="10"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  {this.state.enableActionButton ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={this.withdraw}
                    >
                      Withdraw
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary disabled"
                      type="button"
                      // onClick={this.buy}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        timeout={60000} //3 secs
                        height={20}
                        width={20}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <label htmlFor="amount" className="col-sm-8 col-form-label">
              Withdraw Amount in DAI
            </label>
            <div className="col-sm-4 mt-2">
              <input
                type="text"
                name="amount"
                className="form-control form-control-sm"
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </div>
          </div> */}

          {/* {this.state.enableActionButton ? (
            <div className="row p-3">
              <button
                className="btn btn-primary mt-2 my-2"
                type="button"
                onClick={this.withdraw}
              >
                Withdraw
              </button>
            </div>
          ) : (
            ""
          )} */}

          <div className="row">
            <small className="text-warning">{this.state.statusMessage}</small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IcoWithdrawForm;
