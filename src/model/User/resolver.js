const User = require('./scheme.js');

async function getAllUsers() {
  try{
    return user.find();
  } catch(e) {
    console.log(e)
    return [];
  }
}

async function getUser(userId) {
  try {
    return user.findOne({userId});
  } catch(e) {
    console.log(e);
    return null;
  }
}

module.exports = {
  getAllUsers,
  getUser,
}