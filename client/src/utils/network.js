import { network } from "../config";

const getBlockchainURL = (address) => {
  switch (network) {
    case "kovan":
      return `https://kovan.etherscan.io/token/${address}#balances`;

    default:
      break;
  }
};

const getNetworkId = () => {
  switch (network) {
    case "kovan":
      return 42;

    default:
      break;
  }
};

export { getBlockchainURL, getNetworkId };
