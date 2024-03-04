const axios = require("axios");
const userDao=require("../dao/user.dao");
const bitcoin = require('bitcoinjs-lib'); 

async function signTransaction(txSkeleton, privateKey) {
  const network = bitcoin.networks.testnet; // Use bitcoin.networks.testnet for testnet
  const keyPair = bitcoin.ECPair.fromWIF(privateKey, network);

  const txb = new bitcoin.TransactionBuilder(network);
  txb.setVersion(1); 

  txSkeleton.inputs.forEach(input => {
    txb.addInput(input.prev_hash, input.output_index);
  });
  txSkeleton.outputs.forEach(output => {
    txb.addOutput(output.addresses[0], output.value);
  });

  txSkeleton.inputs.forEach((input, i) => {
    txb.sign({
      prevOutScriptType: 'p2pkh',
      vin: i,
      keyPair: keyPair,
    });
  });

  const tx = txb.build();
  const txHex = tx.toHex();

  return { tx: txHex, tosign: txSkeleton.tosign };
}

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
     throw new Error( "User not found")
        
    },


    SendBitcoin:async(fromaddress,toAddress,amount)=>{

      const newTx = {
        inputs: [{ addresses: [fromaddress] }],
        outputs: [{ addresses: [toAddress], value: parseFloat(Math.floor(amount)) }]
      };
      let url=`${process.env.BTC_API}/${process.env.BTC}/txs/new?token=${process.env.API_TOKEN}`
      const txSkeleton = await axios.post(url, newTx);
      const signedTx = await signTransaction(txSkeleton.data, privateKey); 

      
      const finalTx = await axios.post(`${process.env.BTC_API}/${process.env.BTC}/txs/send`, signedTx);
      return finalTx;

    }
};
