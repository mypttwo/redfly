import React from "react";
import logo from "../logo.svg";
import chevron from "../svg/chevron-double-right.svg";
import "../App.css";
import { MARKET_PLACE, MANAGER } from "./home";
import Banner from "./banner";

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="px-4 pt-3 my-5 text-center">
          <img className="d-block mx-auto mb-4" src={logo} alt="" />
          <h1 className="display-5 fw-bold text-warning">Red Fly</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4 font-monospace text-success mt-3">
              <Banner
                strings={[
                  "Showcase your work on the blockchain. ",
                  "Mint and distribute your own coins.",
                  "Collect rare artifacts and trade coins.",
                  "<span class=' text-warning'>Red Fly</span>",
                  "The confluence of technology and the future.",
                  "And you.",
                ]}
              />
            </p>

            {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-success btn-lg px-4 me-sm-3 text-dark"
              >
                Create NFT Launch ICO
              </button>
              <button
                type="button"
                className="btn btn-warning btn-lg px-4 text-dark"
              >
                Browse Marketplace
              </button>
            </div> */}
          </div>
        </div>
        <div className="container px-4 py-2" id="hanging-icons">
          {/* <h2 className="pb-2 border-bottom">Welcome to the world of NFTs</h2> */}
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="col d-flex align-items-start">
              {/* <div className="icon-square text-light flex-shrink-0 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-double-right mt-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div> */}
              <div>
                <h2 className="text-warning">
                  Showcase your content on the blockchain
                </h2>
                <p>
                  Red Fly helps you create art work on the blockchain as Non
                  Fungible Tokens (NFT).
                </p>
                <p>
                  With one click you can easily mint new NFTs and your content
                  will become sellable globally on decentralized marketplaces.
                </p>

                <a
                  href="#"
                  className="btn btn-warning text-primary"
                  onClick={() => this.props.gotoPage(MANAGER)}
                >
                  Create an NFT
                </a>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              {/* <div className="icon-square text-warning flex-shrink-0 me-3">
                <svg className="bi" width="1em" height="1em">
                  
                </svg>
              </div> */}
              <div>
                <h2 className="text-warning">Sell shares of your content</h2>
                <p>
                  Red Fly offers a unique way of further monetizing your content
                  by helping you sell shares (or coins) of your NFT.
                </p>
                <p>
                  With one click you can create your own unique coin on the
                  blockchain and give buyers a chance to buy a share of your
                  valuable NFT.
                </p>
                <p>
                  And of course, withdraw your earnings when you feel the time
                  is right.
                </p>
                <a
                  href="#"
                  className="btn btn-warning  text-primary"
                  onClick={() => this.props.gotoPage(MANAGER)}
                >
                  Start an ICO
                </a>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              {/* <div className="icon-square text-warning flex-shrink-0 me-3">
                <svg className="bi" width="1em" height="1em">
                  
                </svg>
              </div> */}
              <div>
                <h2 className="text-warning">Buy and Trade shares</h2>
                <p>
                  If you are a buyer Red Fly offers a simple and unique way to
                  build a valuable portfolio of NFT related coins.
                </p>
                <p>
                  Invest early in ICOs and trade these coins on popular
                  decentralized exchanges.
                </p>
                <p>
                  You can also follow your favorite content creators via social
                  media and interact with them.
                </p>
                <a
                  href="#"
                  className="btn btn-warning  text-primary"
                  onClick={() => this.props.gotoPage(MARKET_PLACE)}
                >
                  Buy Coins
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
