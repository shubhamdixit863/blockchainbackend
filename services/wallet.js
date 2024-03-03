const axios = require("axios");

module.exports = {
  GetWalletBalance: async (name) => {
    try {
      const result = await axios.get(
        `${process.env.BTC_API}/${process.env.BTC}/wallets/${name}?token=${process.env.API_TOKEN}`
      );
      const addresses = result.data.addresses;
      const balanceResponses = await Promise.all(
        addresses.map((address) =>
          axios.get(`${process.env.BTC_API}/${process.env.BTC}/addrs/${address}`)
        )
      );
      // Calculate the total balance by summing up the balances of each address
      const totalBalance = balanceResponses.reduce(
        (sum, response) => sum + response.data.balance,
        0
      );

      console.log(totalBalance);
      return totalBalance;
    } catch (error) {
      return error;
    }
  },
  CreateWallet: async (walletAddress, name) => {
    return await axios.post(
      `${process.env.BTC_API}/${process.env.BTC}/wallets?token=${process.env.API_TOKEN}`,
      { name: name, addresses: [walletAddress] }
    );
  },

  WalletDetails:async (name) => {
      return await axios.get(
            `${process.env.BTC_API}/${process.env.BTC}/wallets/${name}?token=${process.env.API_TOKEN}`
          );
        
    },

    ListWallet:async () => {
      return await axios.get(
            `${process.env.BTC_API}/${process.env.BTC}/wallets?token=${process.env.API_TOKEN}`
          );
        
    },
};
