const User=require("../models/User");
async function createUser(userData) {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error creating new user: ' + error.message);
    }
}

module.exports = { createUser };
