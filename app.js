const express=require("express");
const app=express();
const pino = require('pino-http')()
const transactionRouter=require("./routes/transaction.route");
const walletRouter=require("./routes/wallet.route");
const addressRouter=require("./routes/address.route");
const userRoutes=require("./routes/user.route");
const cors=require("cors"); 
app.use(cors()); // for enabling cors
app.use(express.json()); // for parsing json payload
app.use(pino)
app.use("/api/transaction",transactionRouter);
app.use("/api/wallet",walletRouter);
app.use("/api/address",addressRouter);
app.use('/api/users', userRoutes);


module.exports=app;

