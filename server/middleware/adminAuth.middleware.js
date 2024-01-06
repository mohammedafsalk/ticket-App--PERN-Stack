const jwt = require("jsonwebtoken");
const db = require("../db");

async function authCheck(req, res, next) {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.json({
        loggedIn: false,
        err: true,
        message: "No Token Found",
      });
    }
    const verified = jwt.verify(token, "qwertyabcd");
    const admin = await db.User.findByPk(verified.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!admin) {
      return res.json({ loggedIn: false });
    }
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
