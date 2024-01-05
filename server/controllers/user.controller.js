const db = require("../db");
const bcrypt = require("bcryptjs");

async function register(req, res) {
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
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
}

module.exports = {
  register,
  login,
};
