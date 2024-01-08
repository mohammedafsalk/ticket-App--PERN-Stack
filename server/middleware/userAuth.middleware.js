const jwt = require("jsonwebtoken");
const db = require("../db");

async function authCheck(req, res, next) {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.json({
        loggedIn: false,
        success: false,
        message: "No Token Found",
      });
    }
    const verified = jwt.verify(token, "qwertyabcd");
    const user = await db.User.findByPk(verified.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.json({ loggedIn: false, success: false });
    }
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
