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
          <li className="list-group-item d-flex justify-content-between align-items-center text-warning">
            The ICO has not yet started
          </li>
        );
        break;
      case ICOStatus.IN_PROGRESS:
      case ICOStatus.COMPLETED:
        icoStatusJSX = (
          <li className="list-group-item d-flex justify-content-between align-items-center text-info">
            ICO End Date
            <span className="text-info">
              {nft.rft.icoEndDate.toDateString()}
            </span>
          </li>
        );

        break;
      default:
        break;
    }
    return icoStatusJSX;
  };

  render() {
    // console.log(JSON.stringify(this.props));

    let collapseTarget = `collapse${this.props.index}`;

    return (
      <React.Fragment>
        <div>
          <p>
            <button
              className="btn btn-dark dropdown-toggle btn-block text-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#" + collapseTarget}
            >
              {this.props.nft.rft.symbol}
              <span className="badge badge-warning text-dark mx-1">
                {this.props.balance}
              </span>
            </button>
          </p>
          <div className="collapse" id={collapseTarget}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Name
                <span className=" text-info">{this.props.nft.rft.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Symbol
                <span className=" text-info">{this.props.nft.rft.symbol}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Price in DAI
                <span className=" text-info">
                  {this.props.nft.rft.tokenPrice}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Issued
                <span className=" text-info">
                  {this.props.nft.rft.tokenSupply}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Reserved
                <span className=" text-info">
                  {this.props.nft.rft.tokenReserve}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                Sold
                <span className=" text-info">{this.props.totalSupply}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-info">
                You own
                <span className=" text-info">{this.props.balance}</span>
              </li>
              {this.getICOStatusJSX(this.props.nft)}
            </ul>
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IcoDataPage;
