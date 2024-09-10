/**
 * The function searches for users based on a search query and returns the matching user data without
 * passwords.
 * @param request - The `request` parameter typically contains information about the incoming request
 * to the server, such as the request body, headers, parameters, etc. In this specific function
 * `searchUser`, the `request` parameter is used to access the `body` property, which likely contains
 * the search term entered by the
 * @param response - The `response` parameter in the `searchUser` function is used to send a response
 * back to the client making the request. It is typically an object that contains information to be
 * sent back to the client, such as status codes, messages, and data. In this function, the response
 * object is
 * @returns The function `searchUser` is being exported as a module. It is a function that searches for
 * users based on a search term provided in the request body. If the search is successful, it returns a
 * JSON response with a message indicating all users found, the user data (excluding the password), and
 * a success status. If there is an error during the search, it returns a JSON response with an
 */
const UserModel = require("../models/UserModel");

async function searchUser(request, response) {
  try {
    const { search } = request.body;

    const query = new RegExp(search, "i", "g");

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return response.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = searchUser;
