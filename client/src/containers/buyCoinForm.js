import React from "react";
import { buyIco } from "../utils/rftContract";
import { approveTransfer } from "../utils/daiContract";
import Loader from "react-loader-spinner";
import Web3 from "web3";

class BuyCoinForm extends React.Component {
  state = {
    numberOfCoins: "",
    statusMessage: "",
    enableActionButton: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "numberOfCoins":
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

  buyIcoHandler = (error, receipt) => {
    if (error) {
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    } else {
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    }
  };

  daiTransferHandler = (error, receipt) => {
    let web3 = new Web3(window.web3.currentProvider);
    if (error) {
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    } else {
      buyIco(
        this.props.nft.rft.rftAddress,
        web3.utils.toWei(`${this.state.numberOfCoins}`),
        this.buyIcoHandler
      );
      this.setState({
        statusMessage: "DAI transfer approved ...",
      });
    }
  };

  buy = () => {
    let isValid = true;
    const regexp = new RegExp(`^-?[0-9.]+`);
    if (!regexp.test(this.state.numberOfCoins)) {
      isValid = false;
    }
    if (isValid) {
      let web3 = new Web3(window.web3.currentProvider);
      approveTransfer(
        this.props.nft.rft.rftAddress,
        web3.utils.toWei(`${this.state.numberOfCoins}`) *
          this.props.nft.rft.tokenPrice,
        this.daiTransferHandler
      );

      this.setState({
        statusMessage: "Approving DAI transfer...",
        enableActionButton: false,
      });
    }
  };

  render() {
    return (
      <form className="container  p-3">
        {/* <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control "
              name="numberOfCoins"
              placeholder="10"
              value={this.state.numberOfCoins}
              onChange={this.handleChange}
            />
          </div>

          {this.state.enableActionButton ? (
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={this.buy}
              >
                Buy
              </button>
            </div>
          ) : (
            <div className="col">
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                timeout={60000} //3 secs
              />
            </div>
          )}
        </div> */}
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="numberOfCoins"
                placeholder="10"
                value={this.state.numberOfCoins}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                {this.state.enableActionButton ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.buy}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    className="btn btn-primary disabled"
                    type="button"
                    onClick={this.buy}
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
        <div className="row">
          <div className="text-warning">{this.state.statusMessage}</div>
          {this.state.enableActionButton ? (
            ""
          ) : (
            <div className="col-md-auto pt-3 text-danger">
              Metamask will prompt you{" "}
              <span className="fst-italic text-decoration-underline">
                twice
              </span>{" "}
              to complete the action.
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default BuyCoinForm;
