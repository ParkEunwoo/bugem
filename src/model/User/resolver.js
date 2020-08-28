const User = require('./scheme.js');

async function getAllUsers() {
  try{
    return User.find();
  } catch(e) {
    console.log(e)
    return [];
  }
}

async function getUser(id) {
  try {
    return User.findOne({_id: id});
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function isExistId(userId) {
  try {
    const users = await User.find({userId});
    return users.length > 0;
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function isExistName(name) {
  try {
    const users = await User.find({name});
    return users.length > 0;
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function createUser(user) {
  try {
    const userModel = new User();
    userModel.name = user.name;
    userModel.userId = user.userId;
    userModel.userPw = user.userPw;

    return userModel.save();
  } catch(e) {
    console.log(e);
    return null;
  }
}

async function findUser({userId, userPw}) {
  try {
    return User.findOne({userId, userPw});
  } catch(e) {
    console.log(e);
    return null;
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  findUser,
  isExistId,
  isExistName,
}