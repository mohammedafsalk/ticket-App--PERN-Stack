const db = require("../db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token.helper");
const dotenv = require("dotenv");

dotenv.config();

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (email !== process.env.ADMINMAIL)
      return res.json({ success: false, message: "Credentials failed" });

    //Finding admin
    const admin = await db.User.findOne({ where: { email } });
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });

    //Check if password is correct
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });

    const accessToken = generateAccessToken(admin);
    res
      .cookie("adminToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ success: true, accessToken, admin });
  } catch (error) {
    next(error);
  }
}

function logout(req, res) {
  res
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged out", error: false });
}

async function getUsers(req, res, next) {
  try {
    const users = await db.User.findAll({
      where: {
        email: {
          [db.Sequelize.Op.ne]: process.env.ADMINMAIL,
        },
      },
      attributes: { exclude: ["password"] },
    });

    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
}

async function requestTicket(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

function check(req, res, next) {
  const admin = req.admin || null;
  try {
    return res.json({ admin, loggedIn: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  check,
  logout,
  getUsers,
};
