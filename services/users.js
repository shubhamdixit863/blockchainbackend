
const { createUser ,getUserByUserId} = require('../dao/user.dao');

async function registerUser(userData) {
    // check if user already exists
    let data=await getUserByUserId(userData.userId)
    if (data){
        return "User already exists";
    }
    // Here you can add any business logic, like hashing passwords or validating data
    const user = await createUser(userData);
    return user;
}

module.exports = { registerUser };
