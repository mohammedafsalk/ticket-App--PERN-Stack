const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id, userName: user.name }, "qwertyabcd", {
    expiresIn: "7d",
  });
}

module.exports = generateAccessToken;
