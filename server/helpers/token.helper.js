const jwt = require("jsonwebtoken");

function generateAccessToken(user) {

  // Sign a JSON Web Token (JWT) with user-specific data
  // Including userId and userName in the token payload
  // Using the secret key to sign the token
  // Setting expiration to 7 days

  return jwt.sign({ userId: user.id, userName: user.name }, "qwertyabcd", {
    expiresIn: "7d",
  });
}

module.exports = generateAccessToken;
