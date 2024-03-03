const express=require("express");
const { createBtcAddress,validateAddress } = require("../controllers/address.controller");
const router=express.Router();
router.get("/validate/:address",validateAddress);
router.post("/create",createBtcAddress);



module.exports=router;