import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);
const getAccounts = async () => {
  let accounts = await web3.eth.getAccounts();
  let balance = await web3.eth.getBalance(accounts[0]);

  return {
    accounts: accounts,
    balance: balance,
  };
};

export { getAccounts };
