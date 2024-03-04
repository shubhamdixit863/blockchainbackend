const express=require("express");
const { transactionstatus } = require("../controllers/transaction.controller");
const router=express.Router();

router.get("/status/:transactionId",transactionstatus)


module.exports=router;