async function checkTransactionStatus(txId) {
    try {
        let url=`${process.env.BTC_API}/${process.env.BTC}/txs/${txId}?token=${process.env.API_TOKEN}`
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.confirmations && data.confirmations > 0) {
        console.log('Transaction confirmed:', data);
      } else {
        console.log('Transaction not confirmed yet:', data);
      }
      return data; 
    } catch (error) {
      console.error('Error checking transaction status:', error.response ? error.response.data : error.message);
      throw error; 
    }
  }

  module.exports={
    checkTransactionStatus
  }