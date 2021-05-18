import React from "react";
import connectToMetamask from "../utils/metamask";

class MetamaskConnectWarning extends React.Component {
  state = {
    displayConnectWarning: false,
  };
  componentDidMount() {
    this.checkMetamaskConnection();
  }

  checkMetamaskConnection = async () => {
    let displayConnectWarning = true;
    try {
      let { accounts } = await connectToMetamask(this.accountsChangedHandler);
      if (accounts && accounts.length) {
        displayConnectWarning = false;
      }
    } catch (error) {
      console.error("checkMetamaskConnection", error);
    }
    this.setState({
      displayConnectWarning: displayConnectWarning,
    });
  };

  accountsChangedHandler = (connectInfo) => {
    console.log("Metamask accountsChanged!");
    console.log(JSON.stringify(connectInfo));
  };

  render() {
    if (this.state.displayConnectWarning) {
      return (
        <div className="alert alert-dismissible alert-warning text-dark">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <h4 className="alert-heading">Oops!</h4>
          <p className="mb-0">
            It looks like Metamask is either not installed or not connected. You
            can keep browsing stuff but it won't be as much fun.
          </p>
          <p>
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              className="alert-link text-dark"
            >
              Install Metamask if you haven't already and connect to us!
            </a>
            Refresh the page after you are done.
          </p>
        </div>
      );
    }
    return (
      <>
        <div></div>
      </>
    );
  }
}

export default MetamaskConnectWarning;
