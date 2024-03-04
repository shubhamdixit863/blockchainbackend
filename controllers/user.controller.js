// userController.js

const { registerUser } = require('../services/users');

async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({data:user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { register };
