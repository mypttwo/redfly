import React from "react";
import { getBalance } from "../utils/daiContract";
import { withdrawDai } from "../utils/rftContract";

class IcoWithdrawForm extends React.Component {
  state = {
    balance: "",
    amount: "",
    statusMessage: "",
    enableActionButton: true,
  };

  async componentDidMount() {
    let balance = await getBalance(this.props.nft.rft.rftAddress);
    this.setState({
      balance,
      amount: balance,
    });
  }

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
      let balance = await getBalance(this.props.nft.rft.rftAddress);
      this.setState({
        statusMessage: "",
        enableActionButton: true,
        balance,
      });
    }
  };

  withdraw = async () => {
    withdrawDai(
      this.state.amount,
      this.props.nft.rft.rftAddress,
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
        <div className="container text-info border border-dark p-3 ">
          <div className="row">
            <label className="col-sm-8 col-form-label">Balance in DAI</label>
            <div className="col-sm-4 mt-2">{this.state.balance}</div>
          </div>
          <div className="row">
            <label htmlFor="amount" className="col-sm-8 col-form-label">
              Amount in DAI
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
          </div>

          {this.state.enableActionButton ? (
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
          )}

          <div className="row">
            <small className="text-warning">{this.state.statusMessage}</small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IcoWithdrawForm;
