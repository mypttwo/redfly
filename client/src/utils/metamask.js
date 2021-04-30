import detectEthereumProvider from "@metamask/detect-provider";

const connectToMetamask = async (accountsChangedHandler) => {
  try {
    let provider = await detectEthereumProvider();

    if (provider) {
      let accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      if (accountsChangedHandler)
        provider.on("accountsChanged", (connectInfo) => {
          console.log("Metamask accountsChanged!");
          console.log(JSON.stringify(connectInfo));
          accountsChangedHandler();
        });

      return {
        provider,
        accounts,
      };
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (error) {
    console.error(error);
  }
};

export default connectToMetamask;
