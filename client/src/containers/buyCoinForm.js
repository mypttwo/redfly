import React from "react";
import { buyIco } from "../utils/rftContract";

class BuyCoinForm extends React.Component {
  state = {
    numberOfCoins: 0,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  buy = async () => {
    console.log(this.props.nft.rft.rftAddress);
    console.log(this.state.numberOfCoins);
    await buyIco(
      this.props.nft.rft.rftAddress,
      this.state.numberOfCoins,
      this.props.nft.rft.tokenPrice
    );
  };

  render() {
    return (
      <form className="container border border-dark p-3">
        <div className="row py-2">
          <div className="col">
            <div className=" mb-3 font-weight-normal">
              Buy {this.props.nft.rft.symbol}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="numberOfCoins"
              placeholder="10"
              value={this.state.numberOfCoins}
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.buy}
            >
              Buy
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-auto pt-3">
            Metamask will prompt you twice to complete the buy.
          </div>
        </div>
      </form>
    );
  }
}

export default BuyCoinForm;
