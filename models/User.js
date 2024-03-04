const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    userId: {
      type:String,
      unique:true
    },
    walletAddress: [
      {
        token:String,
        name:String,
        addresses:[String]

      }
    ],
  }, { timestamps: true }); 
  
  const User = mongoose.model('User', userSchema);
  module.exports=User;
  