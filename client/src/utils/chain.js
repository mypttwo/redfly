export const name = (chainId) => {
  switch (chainId) {
    case "0x1":
      return "Mainnet";
    case "0x2a":
      return "Kovan";

    case "0x3":
      return "Ropsten";

    case "0x4":
      return "Rinkeby";
    case "0x5":
      return "Goerli";

    default:
      console.error("I'm afraid i can't do that Dave");
      return `unknown chainId : ${chainId}`;
  }
};
