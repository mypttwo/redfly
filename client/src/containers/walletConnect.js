import React from "react";
import { connectWallet, addWalletListener } from "../utils/metamask2";
import { getMaskedAddress } from "../utils/shorten";
import { name } from "../utils/chain";

class WallectConnect extends React.Component {
  state = {
    status: "",
    address: "",
    chainId: "",
  };
  componentDidMount() {
    this.connectWalletPressed();
  }
  connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    console.log(walletResponse);
    this.setWalletResponse(walletResponse);
  };

  setWalletResponse = (walletResponse) => {
    if (!walletResponse.status.includes("Error")) {
      addWalletListener(this.accountsChanged, this.chainChanged);
    }
    this.setState({
      status: walletResponse.status,
      address: walletResponse.address,
      chainId: walletResponse.chainId,
    });
  };

  accountsChanged = (address, status) => {
    this.setState({
      status: status,
      address: address,
    });
  };

  chainChanged = (chainId) => {
    this.setState({
      chainId: chainId,
    });
  };

  connectJSX = () => {
    if (this.state.address) {
      return (
        <div>
          <div className="wallet-address text-truncate btn-link">
            {getMaskedAddress(this.state.address)}
          </div>
          <div className="chainId  btn-link">{name(this.state.chainId)}</div>
        </div>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-primary connect-btn"
        data-mdb-toggle="modal"
        data-mdb-target="#walletModal"
      >
        Connect Wallet
      </button>
    );
  };

  render() {
    return (
      <>
        {this.connectJSX()}
        <div className="modal fade" id="walletModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content wallet-modal">
              <div className="modal-header">
                <div className="modal-title h6" id="walletModalLabel">
                  Connect
                </div>
                <button
                  type="button"
                  className="btn-close btn-sm"
                  data-mdb-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-primary m-6  py-3"
                    data-dismiss="modal"
                    onClick={this.connectWalletPressed}
                  >
                    <img
                      src={
                        "https://raw.githubusercontent.com/MetaMask/brand-resources/c3c894bb8c460a2e9f47c07f6ef32e234190a7aa/SVG/metamask-fox.svg"
                      }
                    ></img>
                    Metamask
                  </button>
                  {/* <button className="btn btn-primary">
                <img
                  src={
                    "https://raw.githubusercontent.com/MetaMask/brand-resources/c3c894bb8c460a2e9f47c07f6ef32e234190a7aa/SVG/metamask-fox.svg"
                  }
                ></img>
                Metamask
              </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WallectConnect;
