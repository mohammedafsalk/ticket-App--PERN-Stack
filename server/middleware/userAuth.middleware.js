const jwt = require("jsonwebtoken");
const db = require("../db");

// Middleware function for authentication check
async function authCheck(req, res, next) {
  try {

    // Extract the token from the request cookies
    const token = req.cookies.userToken;

    // Check if the token is missing
    if (!token) {
      return res.json({
        loggedIn: false,
        success: false,
        message: "No Token Found",
      });
    }

    // Verify the token using the secret key)
    const verified = jwt.verify(token, "qwertyabcd");

    // Find the user associated with the verified userId from the token
    const user = await db.User.findByPk(verified.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.json({ loggedIn: false, success: false });
    }

    // Attach the user data to the request object for future middleware or route handlers
    req.user = user.dataValues;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      message: "Something Went Wrong",
      loggedIn: false,
    });
  }
}

module.exports = authCheck;
