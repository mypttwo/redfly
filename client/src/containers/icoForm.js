import React from "react";
import {
  setupRFTFactoryContract,
  createRFT,
} from "../utils/rftFactoryContract";
import { address as nftAddress } from "../utils/nftContractDef";

class ICOForm extends React.Component {
  state = {
    name: "",
    tokenPrice: 0,
    tokenSupply: 0,
    tokenReserve: 0,
    tokenSymbol: "",
    rftfc: setupRFTFactoryContract(null),
    progress: 100,
  };

  handleNewRFT = (error, rft, creator, nft, tokenId) => {
    if (error) {
      console.error("New RFT event", error);
    } else {
      console.log("rft", rft);
    }
  };

  getRFTFactoryEventHandlers = () => {
    return {
      handleNewRFT: this.handleNewRFT,
    };
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createRFTRecieptHandler = (error, reciept) => {
    if (error) {
      console.error(error);
      console.error(reciept);
    } else {
      console.log(reciept);
    }
  };
  timer = null;
  saveICOData = () => {
    console.log(this.props.tokenId);
    createRFT(
      this.state.rftfc,
      this.state.name,
      this.state.tokenSymbol,
      nftAddress,
      this.props.tokenId,
      this.state.tokenPrice,
      this.state.tokenSupply,
      this.state.tokenReserve,
      this.createRFTRecieptHandler
    );
    this.timer = setInterval(() => {
      let progress = this.state.progress;
      progress += 10;
      this.setState({
        progress: progress,
      });
    }, 5 * 1000);
    this.setState({
      progress: 0,
    });
  };
  getProgressJSX = () => {
    if (this.state.progress < 100) {
      let className = `progress-bar w-${this.state.progress} bg-warning`;
      return (
        <div className="progress my-5">
          <div className={className} role="progressbar"></div>
        </div>
      );
    } else return <></>;
  };
  render = () => {
    return (
      <form>
        <fieldset disabled>
          <legend>Set up your ICO</legend>
        </fieldset>
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
            placeholder="0"
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
            placeholder="Example : 10000"
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
            placeholder="Example : 500"
            value={this.state.tokenReserve}
            onChange={this.handleChange}
          />
          <div id="reserve-help" className="form-text">
            Enter the number of coins that will be reserved; these may be used
            for an initial airdrop for instance.
          </div>
        </div>

        <div className="d-grid gap-2 my-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.saveICOData}
          >
            Save
          </button>
        </div>
        {this.getProgressJSX()}
      </form>
    );
  };
}
export default ICOForm;
