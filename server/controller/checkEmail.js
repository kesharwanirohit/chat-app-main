/**
 * The function `checkEmail` checks if a user with a specific email exists in the database and returns
 * the result.
 * @param request - The `request` parameter typically contains information about the HTTP request that
 * was made to the server. This can include data sent in the request body, query parameters, headers,
 * and more. In the provided code snippet, `request.body` is used to extract the `email` from the
 * request body.
 * @param response - The `response` parameter in the `checkEmail` function is used to send back the
 * HTTP response to the client. It is an object that represents the response that the server sends back
 * to the client in an HTTP request. The response object contains information such as the status code,
 * headers, and data
 * @returns The function `checkEmail` is being exported as a module in this code snippet. It is an
 * asynchronous function that takes `request` and `response` as parameters.
 */
const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
  try {
    const { email } = request.body;

    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return response.status(400).json({
        message: "user not exit",
        error: true,
      });
    }

    return response.status(200).json({
      message: "email verify",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
