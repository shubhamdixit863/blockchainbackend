const express=require("express");
const { createWallet,getWalletBalance, getWalletDetails } = require("../controllers/wallet.controller");
const router=express.Router();

router.get("/",getWalletDetails);
router.post("/create",createWallet);
router.get("/balance/:name",getWalletBalance);
router.get("/details/:name",getWalletDetails);

module.exports=router;