import React from "react";

import { ICOStatus, getICOStatus } from "../utils/contractDataReader";

class IcoDataPage extends React.Component {
  getICOStatusJSX = (nft) => {
    let icoStatus = getICOStatus(nft);
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
      case ICOStatus.COMPLETED:
        icoStatusJSX = (
          <div className="d-flex justify-content-between align-items-center p-3">
            <span>ICO End Date</span>
            <span className="">{nft.rft.icoEndDate.toDateString()}</span>
          </div>
        );

        break;
      default:
        break;
    }
    return icoStatusJSX;
  };

  render() {
    // console.log(JSON.stringify(this.props));

    // let collapseTarget = `collapse${this.props.index}`;

    return (
      <React.Fragment>
        <div className="pb-1 justify-content-center">
          {/* <button
            className="btn btn-primary  dropdown-toggle btn-block"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + collapseTarget}
          >
            {this.props.nft.rft.symbol.toUpperCase()}
            <span className="badge badge-warning mx-1">
              {this.props.balance}
            </span>
          </button> */}

          {/* <div className="collapse" id={collapseTarget}> */}

          <div className="container">
            <div className="row pt-3 border-top border-secondary">
              <div className="col d-flex justify-content-center">
                <div className="h4 font-monospace text-warning">
                  {this.props.nft.rft.symbol}
                </div>
              </div>
            </div>

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
            {/* <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                Name
                <span className=" text-info">{this.props.nft.rft.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                Symbol
                <span className=" text-info">{this.props.nft.rft.symbol}</span>
              </li> */}
            {/* <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                Price in DAI
                <span className=" text-info">
                  {this.props.nft.rft.tokenPrice}
                </span>
              </li> */}
            {/* <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                Issued
                <span className=" text-info">
                  {this.props.nft.rft.tokenSupply}
                </span>
              </li> */}
            {/* <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
              Reserved
              <span className=" text-info">
                {this.props.nft.rft.tokenReserve}
              </span>
            </li> */}
            {/* <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                Sold
                <span className=" text-info">{this.props.totalSupply}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                You own
                <span className=" text-info">{this.props.balance}</span>
              </li> */}

            {this.getICOStatusJSX(this.props.nft)}
          </ul>
          {this.props.children}
          {/* </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default IcoDataPage;
