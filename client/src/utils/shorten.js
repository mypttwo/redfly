const getMaskedAddress = (accountNumber, start = 10, end = 32) => {
  return accountNumber.replace(accountNumber.substring(start, end), "*******");
};

const getEthValue = (weiStr) => {
  let flVal = parseFloat(weiStr);
  return flVal.toFixed(5) + "";
};

export { getMaskedAddress, getEthValue };
