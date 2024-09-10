/* This JavaScript code defines a function called `getUserDetailsFromToken` that takes a token as
input. */
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);

  const user = await UserModel.findById(decode.id).select("-password");

  return user;
};

module.exports = getUserDetailsFromToken;
