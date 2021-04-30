import axios from "axios";

const getEthUSD = async () => {
  let res = null;

  try {
    res = await axios.get("https://min-api.cryptocompare.com/data/price", {
      params: { fsym: "ETH", tsyms: "USD" },
    });
    if (res && res.data) {
      return res.data.USD;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

const getUSDEth = async () => {
  let res = null;

  try {
    res = await axios.get("https://min-api.cryptocompare.com/data/price", {
      params: { fsym: "USD", tsyms: "ETH" },
    });
    if (res && res.data) {
      return res.data.ETH;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

export { getEthUSD, getUSDEth };
