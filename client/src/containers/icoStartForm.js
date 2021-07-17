import React from "react";
import { approveTransferOfTokenFromNFTToRFT } from "../utils/nftContract";
import { startIco } from "../utils/rftContract";

class IcoStartForm extends React.Component {
  state = {
    days: 7,
    statusMessage: "",
    enableActionButton: true,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case "days":
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

  nftTransferApprovalHandler = (error, reciept) => {
    if (error) {
      console.error("nftTransferApprovalHandler", error);
      this.setState({
        statusMessage: "Oops! There was an error! Try again... ",
        enableActionButton: true,
      });
    } else {
      startIco(
        this.state.days,
        this.props.nft.rft.rftContractAddress,
        this.startIcoRecieptHandler
      );
      this.setState({
        statusMessage: "NFT transferred to the ICO...",
      });
    }
  };

  startIcoRecieptHandler = (error, reciept) => {
    if (error) {
      console.error(error);
      this.setState({
        statusMessage: "",
        enableActionButton: true,
      });
    } else {
      console.log(reciept);
      this.setState({ statusMessage: "" });
    }
  };

  launchICO = async () => {
    approveTransferOfTokenFromNFTToRFT(
      this.props.nft.rft,
      this.nftTransferApprovalHandler
    );
    // startIco(
    //   this.state.days,
    //   this.props.nft.rft.rftContractAddress,
    //   this.startIcoRecieptHandler
    // );
    this.setState({
      statusMessage: "Launching the ICO. This may take a couple of minutes...",
      enableActionButton: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container text-info  p-3 ">
          <div className="row">
            <label htmlFor="days" className="col-sm-8 col-form-label">
              Duration in days
            </label>
            <div className="col-sm-4 mt-2">
              <input
                type="text"
                name="days"
                className="form-control form-control-sm"
                placeholder="Example : 7"
                value={this.state.days}
                onChange={this.handleChange}
              />
            </div>
          </div>

          {this.state.enableActionButton ? (
            <div className="row p-3">
              <button
                className="btn btn-primary mt-2 my-2"
                type="button"
                onClick={this.launchICO}
              >
                Launch ICO Today
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="row p-3">
            <div className="text-warning">{this.state.statusMessage}</div>
            <div className="col-md-auto pt-3 text-danger fw-bold">
              Metamask will prompt you{" "}
              <span className="fst-italic text-decoration-underline">
                twice
              </span>{" "}
              to complete the action.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IcoStartForm;
