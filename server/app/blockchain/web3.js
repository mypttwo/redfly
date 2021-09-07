const Web3 = require("web3");
const { network, networkWss } = require("../config");

const getProvider = () => {
  const provider = new Web3.providers.WebsocketProvider(networkWss, {
    clientOptions: {
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
  });
  provider.on("connect", () => console.log("WS Connected"));
  provider.on("error", (e) => {
    console.error("WS Error", e);
    web3.setProvider(getProvider());
  });
  provider.on("end", (e) => {
    console.error("WS End", e);
    web3.setProvider(getProvider());
  });
  provider.on("close", (e) => {
    console.error("WS Close", e);
    web3.setProvider(getProvider());
  });

  return provider;
};
const web3 = new Web3(getProvider());

module.exports = web3;
