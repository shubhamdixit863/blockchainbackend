const { GetWalletBalance, CreateWallet,WalletDetails ,ListWallet, SendBitcoin} = require("../services/wallet");

module.exports = {
  getWalletBalance: async (req, res) => {
    try {
    
      const balance = await GetWalletBalance(req.params.name);

      res.status(200).json({ balance });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  getWalletDetails: async (req, res) => {
     try {
     
       const wallet = await WalletDetails(req.params.name);
 
       res.status(200).json(wallet.data);
     } catch (error) {
       console.log(error);
       res.status(400).json(error);
     }
   },

   listWallet: async (req, res) => {
     try {
     
       const wallet = await ListWallet(req.params.userId);
       res.status(200).json({data:wallet});
     } catch (error) {
       console.log(error);
       res.status(400).json(error);
     }
   },
  createWallet: async (req, res) => {
    try {
      const data = await CreateWallet(
        req.body.wallet_address,
        req.body.wallet_name,
        req.body.userId
      );
      res.status(201).json({data:data.data});
    } catch (error) {
      res.status(400).json(error.response.data);
    }
  },
  sendBitcoin: async (req, res) => {
    try {
      const data = await SendBitcoin(
        req.body.fromaddress,
        req.body.toAddress,
        req.body.amount
      );
      res.status(201).json({data:data.data});
    } catch (error) {
      console.log(error.response.data);
      res.status(400).json({data:error.response.data.errors});
    }
  },
};
