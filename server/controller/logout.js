/**
 * The `logout` function in JavaScript clears the token cookie to end the session and returns a success
 * message or an error message if encountered.
 * @param request - The `request` parameter typically represents the incoming HTTP request in a Node.js
 * application. It contains information about the request made by the client, such as headers,
 * parameters, and body content. In the provided code snippet, the `request` parameter is likely used
 * to handle the logout functionality based on the
 * @param response - The `response` parameter in the `logout` function is used to send a response back
 * to the client making the request. In this function, it is used to set a cookie named 'token' to an
 * empty value, indicating that the user has logged out successfully. It also sends a JSON response
 * @returns The `logout` function is returning a response with a status code of 200 and a JSON object
 * containing a message "session out" and a success status of true if the logout operation is
 * successful. If an error occurs, it will return a response with a status code of 500 and a JSON
 * object containing the error message or the error itself.
 */
async function logout(request, response) {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return response.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
