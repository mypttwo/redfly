import React from "react";
import { setupNFTContract, withdraw } from "../utils/nftContract";

class NFTAdmin extends React.Component {
  withdraw = () => {
    let nftc = setupNFTContract(null);
    withdraw(nftc);
  };
  render() {
    return (
      <div className="container">
        <button className="btn btn-info" onClick={this.withdraw}>
          Withdraw
        </button>
      </div>
    );
  }
}

export default NFTAdmin;
