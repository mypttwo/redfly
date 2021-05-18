import React from "react";
import IcoDataPage from "./icoDataPage";
import { approveTransferOfTokenFromNFTToRFT } from "../utils/nftContract";
import { startIco } from "../utils/rftContract";
import { ICOStatus, getICOStatus } from "../utils/contractDataReader";

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
      this.setState({ statusMessage: "", enableActionButton: true });
    } else {
      startIco(
        this.state.days,
        this.props.nft.rft.rftAddress,
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
      this.props.nft.rft.rftAddress,
      this.props.nft.rft.tokenId,
      this.nftTransferApprovalHandler
    );
    this.setState({
      statusMessage: "Launching the ICO. This will take a while...",
      enableActionButton: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container text-info border border-dark p-3 ">
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
            <div className="col-md-auto pt-3 text-danger small">
              Metamask will prompt you twice to complete the action.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IcoStartForm;
