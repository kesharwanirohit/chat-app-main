/**
 * The function `checkPassword` compares the input password with the hashed password of a user,
 * generates a JWT token for authentication, and sets it as a cookie in the response.
 * @param request - The `request` parameter typically contains information about the HTTP request that
 * was made to the server. This can include data sent in the request body, parameters, headers, and
 * more. In the provided code snippet, `request.body` is used to access the data sent in the request
 * body, specifically the
 * @param response - The `response` parameter in the `checkPassword` function is used to send a
 * response back to the client making the request. It is typically an object that represents the HTTP
 * response that will be sent back to the client. The response object contains methods and properties
 * that allow you to send data, set
 * @returns The function `checkPassword` is returning a response based on the outcome of the password
 * verification process. If the password is successfully verified, it generates a JWT token, sets it as
 * a cookie, and returns a success message along with the token. If the password verification fails, it
 * returns an error message indicating to check the password. In case of any errors during the process,
 * it returns a 500
 */
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(request, response) {
  try {
    const { password, userId } = request.body;

    const user = await UserModel.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return response.status(400).json({
        message: "Please check password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      http: true,
      secure: true,
    };

    return response.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
