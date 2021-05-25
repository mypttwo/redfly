import React from "react";
import NFTWizard from "./nftWizard";
import withAppContext from "../hocs/withAppContext";

class CreateNFT extends React.Component {
  render() {
    return (
      <div className="container mt-2">
        <NFTWizard></NFTWizard>
      </div>
    );
  }
}

export default withAppContext(CreateNFT);
