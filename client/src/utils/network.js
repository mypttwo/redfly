import { network } from "../config";

const getBlockchainURL = (address) => {
  switch (network) {
    case "kovan":
      return `https://kovan.etherscan.io/token/${address}#balances`;

    default:
      break;
  }
};

export { getBlockchainURL };
