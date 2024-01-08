const db = require("../db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token.helper");
const ticket = require("../models/ticket");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
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

function authCheck(req, res) {
  const user = req.user;
  try {
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.json({ loggedIn: false });
  }
}

async function createTicket(req, res, next) {
  try {
    const {
      requested_by,
      requestedId,
      subject,
      status,
      dueDate,
      assignee,
      assigneeId,
    } = req.body;
    const newTicket = await db.Ticket.create({
      requested_by,
      requestedId,
      subject,
      status,
      due_date: dueDate,
      assignee,
      assigneeId,
    });
    newTicket.save();
    res.json({ success: true, message: "Ticket created successfully" });
  } catch (error) {
    next(error);
  }
}

async function getAssignees(req, res, next) {
  try {
    const { id } = req.user;
    const assignees = await db.User.findAll({
      where: {
        id: {
          [db.Sequelize.Op.not]: id,
        },
      },
    });
    const userDetails = assignees.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    res.json({ success: true, userDetails });
  } catch (error) {
    next(error);
  }
}

async function getTickets(req, res, next) {
  try {
    const { id } = req.user;
    const tickets = await db.Ticket.findAll({
      where: {
        requestedId: id,
      },
    });
    const assgnedTickets = await db.Ticket.findAll({
      where: {
        assigneeId: id,
      },
    });
    const ticketsDataValues = tickets.map((ticket) => ticket.dataValues);
    const assignedValues = assgnedTickets.map((ticket) => ticket.dataValues);
    res.json({ success: true, ticketsDataValues ,assignedValues});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  register,
  login,
  authCheck,
  createTicket,
  getTickets,
  getAssignees,
  logout,
};
