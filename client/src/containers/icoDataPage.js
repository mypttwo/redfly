import React from "react";
import AddToken from "../components/addToken";

import {
  ICOStatus,
  getICOStatus,
  getICOStatusByIcoEndDate,
} from "../utils/contractDataReader";

class IcoDataPage extends React.Component {
  getICOStatusJSX = () => {
    // let icoStatus = getICOStatus(this.props.nft);
    let icoStatus = getICOStatusByIcoEndDate(this.props.icoEndDate);
    let icoStatusJSX = "";
    switch (icoStatus) {
      case ICOStatus.NOT_INIT:
        break;
      case ICOStatus.PENDING:
        icoStatusJSX = (
          <div className="text-muted p-3">The ICO has not yet started</div>
        );
        break;
      case ICOStatus.IN_PROGRESS:
        icoStatusJSX = (
          <div className="d-flex justify-content-center align-items-center p-3">
            <span className="mr-3">ICO End Date</span>
            <span className="">{this.props.icoEndDate.toDateString()}</span>
          </div>
        );
        break;
      case ICOStatus.COMPLETED:
        icoStatusJSX = (
          <div className="d-flex justify-content-center align-items-center p-3">
            <span className="mr-3">ICO ended on</span>
            <span className="">{this.props.icoEndDate.toDateString()}</span>
          </div>
        );

        break;
      default:
        break;
    }
    return icoStatusJSX;
  };

  render() {
    return (
      <React.Fragment>
        <div className="pb-1 justify-content-center">
          <div className="container">
            <div className="row pt-3 border-top border-secondary">
              <div className="col d-flex justify-content-center">
                <div className="h4 font-monospace text-warning mx-3">
                  {this.props.nft.rft.symbol}
                </div>
                <AddToken
                  rftContractAddress={this.props.nft.rft.rftContractAddress}
                  symbol={this.props.nft.rft.symbol}
                ></AddToken>
              </div>
            </div>
            {/* <div className="row pt-3 ">
              <div className="col d-flex justify-content-center">
                <AddToken
                  rftContractAddress={this.props.nft.rft.rftContractAddress}
                  symbol={this.props.nft.rft.symbol}
                ></AddToken>
              </div>
            </div> */}
            <div className="row py-3">
              <div className="col" style={{ textAlign: "center" }}>
                <span className="i">Issued</span>

                <br />
                <span className="i">{this.props.nft.rft.tokenSupply}</span>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
                <span className="i">Reserved</span>

                <br />
                <span className="i">{this.props.nft.rft.tokenReserve}</span>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
                <span className="i">Sold</span>

                <br />
                <span className="i">{this.props.totalSupply}</span>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
                <span className="i">Bought</span>
                <br /> <span className="i">{this.props.balance}</span>
              </div>
            </div>
          </div>
          <ul className="list-group list-group-flush mt-1">
            {this.getICOStatusJSX()}
          </ul>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default IcoDataPage;
