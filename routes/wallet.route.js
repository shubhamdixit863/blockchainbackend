const express=require("express");
const { createWallet,getWalletBalance, getWalletDetails, listWallet, sendBitcoin } = require("../controllers/wallet.controller");
const router=express.Router();

router.get("/",getWalletDetails);
router.post("/create",createWallet);
router.get("/balance/:name",getWalletBalance);
router.get("/details/:name",getWalletDetails);
router.get("/list/:userId",listWallet);
router.post("/send",sendBitcoin);

module.exports=router;