const jwt = require("jsonwebtoken");
const db = require("../db");

// Middleware function for authentication check
async function authCheck(req, res, next) {
  try {

    // Extract the token from the request cookies
    const token = req.cookies.adminToken;

    // Check if the token is missing
    if (!token) {
      return res.json({
        loggedIn: false,
        err: true,
        message: "No Token Found",
      });
    }

    // Verify the token using the secret key
    const verified = jwt.verify(token, "qwertyabcd");
    const admin = await db.User.findByPk(verified.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!admin) {
      return res.json({ loggedIn: false });
    }

    // Attach the admin data to the request object for future middleware or route handlers
    req.admin = admin.dataValues;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error,
      message: "Something Went Wrong",
      loggedIn: false,
    });
  }
}

module.exports = authCheck;
