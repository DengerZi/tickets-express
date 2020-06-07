const User = require('../models/User');

function getUsersByRole(_role) {
  if (_role) {
    return User.find({_role}).select("-password");
  }

  return null;
}

function getUserById(id) {
  if (id) {
    return User.findById(id).select("-password").populate({path: "_role", select: ["name"] });
  }

  return null;
}

function getUserByEmail(email) {
  if (email) {
    return User.findOne({email}).populate({path: "_role", select: ["name"] });
  }

  return null;
}

function countAllUsers() {
  return User.countDocuments({});
}

function storeUser(params) {
  return User.create(params);
}

function validatePassword(user, password) {
  if (user) {
    return user.verifyPassword(password);
  }

  return false;
}

module.exports = {getUsersByRole, getUserById, getUserByEmail, countAllUsers, storeUser, validatePassword};
