import React from "react";

import { CREATENFT, MANAGER, MARKET_PLACE } from "./home";

class Withdraw extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              class="card text-white bg-primary mb-3"
              // style={{ width: "18rem" }}
            >
              <div class="card-header">STEPS</div>
              <div class="card-body">
                <h4 class="card-title">Withdrawing DAI from your Coin</h4>
                <p class="card-text lh-base py-1">
                  1. Click on the{" "}
                  <span
                    className="p-2 mb-0 bg-dark rounded"
                    style={{ width: "20rem" }}
                  >
                    <a
                      href="#"
                      className={`text-white`}
                      onClick={() => this.props.gotoPage(MANAGER)}
                    >
                      ICO Dashboard
                    </a>
                  </span>{" "}
                  menu item.
                </p>
                <p class="card-text lh-base py-1">
                  2. Find the NFT you want to withdraw DAI from.
                </p>
                <p class="card-text lh-base py-1">
                  3. Specify the amount of DAI you wish to withdraw. (You should
                  be able to see the DAI balance at the bottom as well.){" "}
                </p>
                <p class="card-text lh-base py-1">
                  And click the
                  <span className="p-2 mb-0">
                    <div class="input-group my-3" style={{ width: "20rem" }}>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="10"
                        name="amount"
                        value="10"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </span>{" "}
                  button at the bottom.{" "}
                </p>
                <p class="card-text lh-base py-1">
                  After the transaction is complete you should be able to see
                  the balance of DAI in Metamask.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Withdraw;
