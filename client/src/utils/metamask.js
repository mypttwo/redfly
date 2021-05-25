import detectEthereumProvider from "@metamask/detect-provider";

const connectToMetamask = async (
  accountsChangedHandler,
  networkChangedHandler
) => {
  try {
    let provider = await detectEthereumProvider();

    if (provider) {
      let accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      let network = await provider.request({
        method: "eth_chainId",
      });

      if (networkChangedHandler) {
        provider.on("chainChanged", (chainId) => {
          networkChangedHandler(chainId);
        });
      }

      if (accountsChangedHandler)
        provider.on("accountsChanged", (connectInfo) => {
          console.log(connectInfo);
          accountsChangedHandler(connectInfo);
        });

      return {
        provider,
        accounts,
        network,
      };
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default connectToMetamask;
