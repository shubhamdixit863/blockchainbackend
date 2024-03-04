const { checkTransactionStatus } = require("../services/transaction");

async function transactionstatus (req, res) {
    const { transactionId} = req.params; 
    if (!transactionId) {
      return res.status(400).json({ error: 'Please provide transactionId, network, and token' });
    }
    try {
      const status = await checkTransactionStatus(transactionId);
      res.json({ status });
    } catch (error) {
      console.error('Error in transaction-status controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports={
    transactionstatus
  }