const axios=require("axios");

module.exports={
      // Creates bitcoin address
      CreateAddress:async ()=>{
            return await axios.post(`${process.env.BTC_API}/${process.env.BTC}/addrs`)
      },
      ValidateAddress:async(address)=>{
        return await axios.get(`${process.env.BTC_API}/${process.env.BTC}/addrs/${address}`)
      }


    

}