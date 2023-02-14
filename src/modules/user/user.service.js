const User = require("./user.model");

// Register User Service        --------------------------->>

exports.registerUserService = async (payload) => {
  const user = await User.create(payload);
  const userData = JSON.parse(JSON.stringify(user));
  delete userData.password;
  delete userData.role;
  return userData;
};