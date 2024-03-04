const User = require("../models/User");
async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    if (err) {
      if (err.code === 11000) {
        throw new Error("Error creating new user: " + "Duplicate userId found");
      } else {
        console.log("An error occurred", err);
      }
    }
  }
}

async function getUserByUserId(userid) {
  try {
    const user = await User.findOne({ userId: userid });

    return user;
  } catch (err) {
    throw new Error("Error getting user " + err);
  }
}

async function updateUserByUserId(userid,data) {
    try {
      const user = await User.updateOne({ userId: userid ,$set:data});
  
      return user;
    } catch (err) {
      throw new Error("Error getting user " + err);
    }
  }

module.exports = { createUser ,getUserByUserId,updateUserByUserId};
