
const { createUser } = require('../dao/user.dao');

async function registerUser(userData) {
    // Here you can add any business logic, like hashing passwords or validating data
    const user = await createUser(userData);
    return user;
}

module.exports = { registerUser };
