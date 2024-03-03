const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    walletAddress: [String],
  }, { timestamps: true }); 
  
  const User = mongoose.model('User', userSchema);
  