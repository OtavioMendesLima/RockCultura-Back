// services/userService.js
const User = require('../models/user');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

module.exports = {
  createUser,
};
