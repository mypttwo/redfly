import React from "react";
import IcoDataPage from "./icoDataPage";
import { startIco } from "../utils/rftContract";
import { ICOStatus, getICOStatus } from "../utils/contractDataReader";

class IcoStartForm extends React.Component {
  state = {
    days: 7,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  launchICO = async () => {
    console.log(this.state.days);
    await startIco(
      this.state.days,
      this.props.nft.rft.nftAddress,
      this.props.nft.rft.rftAddress,
      this.props.nft.rft.tokenId
    );
  };
  render() {
    let icoStartJSX = "";
    let icoStartBtnJSX = "";
    let icoStatus = getICOStatus(this.props.nft);

    if (icoStatus == ICOStatus.PENDING) {
      icoStartJSX = (
        <React.Fragment>
          <div className="container text-info border border-dark p-3 ">
            <div className="row">
              <label htmlFor="days" className="col-sm-8 col-form-label">
                Duration in days
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  name="days"
                  className="form-control form-control-sm"
                  value={this.state.days}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.launchICO}
                >
                  Launch ICO
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <IcoDataPage nft={this.props.nft}></IcoDataPage>
        {icoStartJSX}
        {icoStartBtnJSX}
      </React.Fragment>
    );
  }
}

export default IcoStartForm;
