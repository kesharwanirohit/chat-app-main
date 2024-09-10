/**
 * The function retrieves user details from a token stored in a cookie and returns them as a JSON
 * response.
 * @param request - The `request` parameter typically contains information about the incoming HTTP
 * request, such as headers, body, parameters, cookies, etc. In your code snippet, you are accessing
 * the `token` from `request.cookies.token` to get the user's token for further processing. This token
 * is then used to
 * @param response - The `response` parameter in the `userDetails` function is used to send a response
 * back to the client making the request. In this case, the function is handling a request to get user
 * details based on a token. The response will contain a status code, a message, and the user data
 * @returns The `userDetails` function is being exported. This function retrieves a token from the
 * request cookies, gets user details using the `getUserDetailsFromToken` helper function, and then
 * returns a JSON response with the user details if successful. If an error occurs, it returns a JSON
 * response with the error message.
 */
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    return response.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
