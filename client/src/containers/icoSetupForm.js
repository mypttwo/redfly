import React from "react";
import {
  setupRFTFactoryContract,
  createRFT,
} from "../utils/rftFactoryContract";
import { address as nftAddress } from "../utils/nftContractDef";
import Loader from "react-loader-spinner";
import withAppContext from "../hocs/withAppContext";

class IcoSetupForm extends React.Component {
  state = {
    name: this.props.nft.name,
    tokenPrice: "",
    tokenSupply: "",
    tokenReserve: "",
    tokenSymbol: "",
    statusMessage: "",
    enableActionButton: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "tokenPrice":
      case "tokenSupply":
      case "tokenReserve":
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

  createRFTRecieptHandler = (error, reciept) => {
    if (error) {
      console.error(error);
      console.error(reciept);
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    } else {
      console.log(reciept);
      this.setState({
        statusMessage: "",
      });
    }
  };

  saveICOData = () => {
    createRFT(
      this.props.appContext.rftfc,
      this.state.name,
      this.state.tokenSymbol,
      nftAddress,
      this.props.nft.tokenId,
      this.state.tokenPrice,
      this.state.tokenSupply,
      this.state.tokenReserve,
      this.createRFTRecieptHandler
    );
    this.setState({
      statusMessage: "Setting up the ICO. This may take a while...",
      enableActionButton: false,
    });
  };

  render = () => {
    let collapseTarget = `collapse${this.props.index}`;
    console.log("index", this.props.index);
    return (
      <div>
        <p>
          <button
            className="btn btn-dark text-info dropdown-toggle btn-block"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + collapseTarget}
          >
            Set up your ICO
          </button>
        </p>
        <form className="collapse p-3" id={collapseTarget}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Example : Masterpiece"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div id="name-help" className="form-text">
              Enter the name of the coin.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="symbol" className="form-label">
              Symbol
            </label>
            <input
              type="text"
              className="form-control"
              name="tokenSymbol"
              placeholder="Example : MMP"
              value={this.state.tokenSymbol}
              onChange={this.handleChange}
            />
            <div id="sym-help" className="form-text">
              Enter the symbol of the coin.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price in DAI
            </label>
            <input
              type="text"
              className="form-control"
              name="tokenPrice"
              placeholder="Example : 1"
              value={this.state.tokenPrice}
              onChange={this.handleChange}
            />
            <div id="price-help" className="form-text">
              Enter the price of a coin in USD/DAI
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="supply" className="form-label">
              Supply
            </label>
            <input
              type="text"
              className="form-control"
              name="tokenSupply"
              placeholder="Example : 1000"
              value={this.state.tokenSupply}
              onChange={this.handleChange}
            />
            <div id="supply-help" className="form-text">
              Enter the number of coins that will be issued
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="reserve" className="form-label">
              Reserve
            </label>
            <input
              type="text"
              className="form-control"
              name="tokenReserve"
              placeholder="Example : 50"
              value={this.state.tokenReserve}
              onChange={this.handleChange}
            />
            <div id="reserve-help" className="form-text">
              Enter the number of coins that will be reserved; these may be used
              for an initial airdrop for instance.
            </div>
          </div>
          {this.state.enableActionButton ? (
            <div className="d-grid gap-2 my-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.saveICOData}
              >
                Save
              </button>
            </div>
          ) : (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              timeout={60000} //3 secs
            />
          )}
          <div>
            <small className="text-warning">{this.state.statusMessage}</small>
          </div>
        </form>
      </div>
    );
  };
}
export default withAppContext(IcoSetupForm);
