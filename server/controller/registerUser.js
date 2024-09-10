/**
 * The function `registerUser` registers a new user by hashing the password and saving the user details
 * in the database.
 * @param request - The `request` parameter typically contains information about the HTTP request that
 * was made to the server. This includes data sent in the request body, parameters, headers, etc. In
 * the context of your `registerUser` function, the `request` parameter is likely an object that
 * contains the user's registration
 * @param response - The `response` parameter in the `registerUser` function is used to send back a
 * response to the client making the request. It is typically an object that contains information such
 * as status codes, messages, data, and any errors that occurred during the process of registering a
 * user. The response object is
 * @returns The `registerUser` function is being returned, which is responsible for registering a new
 * user by hashing the password and saving the user details in the database. If successful, it returns
 * a success message along with the user data. If there is an error during the process, it returns an
 * error message.
 */
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;

    const checkEmail = await UserModel.findOne({ email }); //{ name,email}  // null

    if (checkEmail) {
      return response.status(400).json({
        message: "Already user exits",
        error: true,
      });
    }

    //password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return response.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
