import React from "react";
import { address } from "../utils/nftContract";
import { setupRFTFactoryContract, create } from "../utils/rftFactoryContract";

class Admin extends React.Component {
  componentDidMount() {}

  setupMetamask = async (web3) => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const ethereum = window.ethereum;
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          console.log(`Accounts:\n${accounts.join("\n")}`);
        })
        .catch((error) => {
          console.error(
            `Error fetching accounts: ${error.message}.
           Code: ${error.code}. Data: ${error.data}`
          );
        });

      const logAccounts = (accounts) => {
        console.log(`Accounts:\n${accounts.join("\n")}`);
      };
      ethereum.on("accountsChanged", logAccounts);

      ethereum.on("disconnect", (code, reason) => {
        console.log(
          `Ethereum Provider connection closed: ${reason}. Code: ${code}`
        );
      });
    }
  };

  click = () => {
    this.setupMetamask();
    let rftfc = setupRFTFactoryContract();
    /*
string calldata name, 
    string calldata symbol,
    address _nftAddress,
    uint _nftTokenId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    address daiAddress
*/
    create(rftfc, "NAME1", "MYSYMBOL1");
  };

  render() {
    return (
      <div>
        <button onClick={this.click}>hello</button>
      </div>
    );
  }
}

export default Admin;
