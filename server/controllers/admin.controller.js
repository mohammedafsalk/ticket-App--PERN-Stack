const db = require("../db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token.helper");
const dotenv = require("dotenv");

dotenv.config();

async function login(req, res) {
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

function sample(req, res) {
  const admin = req.admin;
  res.json({ admin });
}

module.exports = {
  login,
  sample,
  logout,
};