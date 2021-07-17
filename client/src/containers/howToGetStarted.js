import React from "react";

import { CREATENFT, MANAGER, MARKET_PLACE } from "./home";

class GetStarted extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="card text-white bg-primary mb-3"
              style={{ width: "18rem" }}
            >
              <div className="card-header">STEP 1</div>
              <div className="card-body">
                <h4 className="card-title">Create an NFT</h4>
                <p className="card-text lh-base py-1">
                  1. Click on the{" "}
                  <button
                    type="button"
                    className={`btn btn-success btn-sm font-monospace mx-2`}
                    onClick={() => this.props.gotoPage(CREATENFT)}
                  >
                    Create NFT
                  </button>{" "}
                  menu item.
                </p>
                <p className="card-text lh-base py-1">
                  2. Fill in all the{" "}
                  <span className="fw-bolder text-warning">Basic Details</span>-
                  these are required!
                </p>
                <p className="card-text lh-base py-1">
                  Add your{" "}
                  <span className="fw-bolder text-warning">Social Media </span>
                  links as well to help connect with interested buyers who may
                  want to follow you.
                </p>
                <p className="card-text lh-base py-1">
                  Remember to check the{" "}
                  <span className="fw-bolder text-warning">Preview </span>{" "}
                  before you save your data.
                </p>
                <p className="card-text lh-base py-1">
                  3. Click the{" "}
                  <span className="fw-bolder text-warning">Mint </span> button
                  to mint your new NFT!
                </p>
                <p className="card-text lh-base py-1">
                  In a couple of minutes buyers should be able to view your new
                  NFT in the ICO Marketplace.
                </p>
                <p className="card-text lh-base py-1">
                  {" "}
                  However buyers will not be able to do much till you setup the
                  ICO for the NFT. You should be able to proceed to Step 2 -
                  Setup your ICO.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card text-white bg-info mb-3"
              style={{ width: "18rem" }}
            >
              <div className="card-header">STEP 2</div>
              <div className="card-body">
                <h4 className="card-title">Setup the ICO</h4>
                <p className="card-text lh-base py-1">
                  1. Click on the{" "}
                  <p className="p-2 mb-0 bg-dark rounded">
                    <a
                      href="#"
                      className={`text-white`}
                      onClick={() => this.props.gotoPage(MANAGER)}
                    >
                      ICO Dashboard
                    </a>
                  </p>{" "}
                  menu item.
                </p>
                <p className="card-text lh-base py-1">
                  2. Find the NFT you want to setup an ICO for. Click on the{" "}
                  <p className="p-2 mb-0 bg-dark rounded dropdown-toggle text-white">
                    Set up your ICO
                  </p>{" "}
                  button in the NFT to view the setup form.
                </p>
                <p className="card-text lh-base py-1">
                  3. Plan out the ICO and fill in the basic data on the setup
                  form and click the{" "}
                  <p className="p-2 mb-0">
                    <button className="btn btn-primary">Save</button>
                  </p>{" "}
                  button at the bottom.
                </p>
                <p className="card-text lh-base py-1">
                  In a couple of minutes buyers should be able to view the
                  information about your upcoming ICO in the ICO Marketplace.
                </p>
                <p className="card-text lh-base py-1">
                  However buyers will not be able to buy your Coins till you
                  start the ICO. You should be able to proceed to Step 3 - Start
                  your ICO.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card text-white bg-success mb-3"
              style={{ width: "18rem" }}
            >
              <div className="card-header">STEP 3</div>
              <div className="card-body">
                <h4 className="card-title">Start the ICO</h4>
                <p className="card-text lh-base py-1">
                  1. Click on the{" "}
                  <p className="p-2 mb-0 bg-dark rounded">
                    <a
                      href="#"
                      className={`text-white`}
                      onClick={() => this.props.gotoPage(MANAGER)}
                    >
                      ICO Dashboard
                    </a>
                  </p>{" "}
                  menu item.
                </p>
                <p className="card-text lh-base py-1">
                  2. Find the NFT you want to setup an ICO for.
                </p>
                <p className="card-text lh-base py-1">
                  3. Specify the number of days you want the ICO to run.{" "}
                </p>
                <p className="card-text lh-base py-1">
                  4. Click on the
                  <p className="p-2 mb-0">
                    <button className="btn btn-primary">
                      Launch ICO Today
                    </button>
                  </p>{" "}
                  button in the NFT to launch your ICO.{" "}
                  <span className="text-danger fw-bold">
                    Metamask will prompt you twice to complete the action.
                  </span>
                </p>
                <p className="card-text lh-base py-1">
                  In a couple of minutes buyers will be able to buy Coins for
                  your NFT in the ICO Marketplace. Congratulations!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted;
