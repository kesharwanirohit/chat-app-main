/**
 * The function `updateUserDetails` updates the name and profile picture of a user based on the token
 * provided in the request.
 * @param request - The `request` parameter typically contains information about the incoming HTTP
 * request, such as headers, parameters, body, cookies, etc. In the provided code snippet, the
 * `request` parameter is used to access the cookies and the body of the request.
 * @param response - The `response` parameter in the `updateUserDetails` function is used to send a
 * response back to the client making the request. It is typically an object that represents the HTTP
 * response that will be sent back to the client, containing data such as status codes, headers, and
 * the response body.
 * @returns The `updateUserDetails` function is returning a JSON response with the following structure:
 * - message: "user update successfully"
 * - data: userInfomation (details of the updated user)
 * - success: true
 */
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    const { name, profile_pic } = request.body;

    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInfomation = await UserModel.findById(user._id);

    return response.json({
      message: "user update successfully",
      data: userInfomation,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
