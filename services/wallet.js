const axios = require("axios");
const userDao=require("../dao/user.dao");

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
  CreateWallet: async (walletAddress, name,userId) => {
    // check if userId exists
    let userData=await userDao.getUserByUserId(userId);
    if(userData){
      let walleData= await axios.post(
        `${process.env.BTC_API}/${process.env.BTC}/wallets?token=${process.env.API_TOKEN}`,
        { name: name, addresses: [walletAddress] }
      );
      if(walleData.data){
        userDao.updateUserByUserId(userId,{walletAddress:[walleData.data]})
      }

      return walleData
    }

  return {data:"User doesnt exists"}
     
  },

  WalletDetails:async (name) => {
      return await axios.get(
            `${process.env.BTC_API}/${process.env.BTC}/wallets/${name}?token=${process.env.API_TOKEN}`
          );
        
    },

    ListWallet:async (userId) => {
     let user=await userDao.getUserByUserId(userId);
     if(user){
      return user.walletAddress
     }
     return "User not found"
        
    },


    SendBitcoin:async(fromaddress,toAddress,amount)=>{
      // use axios

      const newTx = {
        inputs: [{ addresses: [fromAddress] }],
        outputs: [{ addresses: [toAddress], value: amount }]
      };
      let url=`${process.env.BTC_API}/${process.env.BTC}/txs/new?token=${process.env.API_TOKEN}`
      const signedTx = signTransaction(txSkeleton.data, privateKey); 

      const txSkeleton = await axios.post(url, newTx);
      const finalTx = await axios.post(`${process.env.BTC_API}/${process.env.BTC}/txs/send`, signedTx);
      return finalTx;

    }
};
