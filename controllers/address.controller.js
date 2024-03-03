const {CreateAddress,ValidateAddress}=require("../services/address");
async function createBtcAddress(req, res) {
    try {
        const address = await CreateAddress();
        req.log.info("create btc address called")
        res.status(201).json(address.data);
    } catch (error) {
        req.log.error(error)
        res.status(400).send(error);
    }
}

async function validateAddress(req, res) {
    try {
        const data = await ValidateAddress(req.params.address);
        res.status(201).json(data.data);
    } catch (error) {
        req.log.error(error)
        res.status(400).json(error);
    }
}

module.exports={
    createBtcAddress,
    validateAddress
}