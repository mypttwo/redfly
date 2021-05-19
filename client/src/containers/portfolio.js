import React from "react";
import NFTWizard from "./nftWizard";
import withAppContext from "../hocs/withAppContext";

class Portfolio extends React.Component {
  render() {
    return (
      <div className="container">
        <NFTWizard></NFTWizard>
      </div>
    );
  }
}

export default withAppContext(Portfolio);
