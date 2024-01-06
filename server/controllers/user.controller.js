const db = require("../db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token.helper");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Creating a new user
    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //Finding user
    const user = await db.User.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    //Check if password is correct
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });

    const accessToken = generateAccessToken(user);
    res
      .cookie("userToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ success: true, accessToken, user });
  } catch (error) {
    next(error);
  }
}

function logout(req, res) {
  res
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged out", error: false });
}

function sample(req, res) {
  console.log(req.user, "controller");
}

module.exports = {
  register,
  login,
  sample,
  logout
};
