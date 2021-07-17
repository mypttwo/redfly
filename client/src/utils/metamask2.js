export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // debugger;
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const obj = {
        status: `Connected ${addressArray[0]}`,
        address: addressArray[0],
        chainId: chainId,
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Error : " + err.message,
        chainId: "",
      };
    }
  } else {
    return {
      address: "",
      status: "Error : Not installed",
      chainId: "",
    };
  }
};

export const addWalletListener = (accountsChanged, chainChanged) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("accountsChanged");
      if (accounts.length > 0) {
        accountsChanged(accounts[0], "Connected");
      } else {
        accountsChanged("", "Error");
      }
    });

    window.ethereum.on("chainChanged", (chainId) => {
      console.log("chainChanged");
      chainChanged(chainId);
    });
  } else {
    accountsChanged("", "Error");
  }
};
