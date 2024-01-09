const db = require("../db");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token.helper");
const dotenv = require("dotenv");

dotenv.config();

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
    //Passing the error to error handler
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

    //Generating usertoken
    const accessToken = generateAccessToken(user);

    //Storing the access token in cookie and sending response
    res
      .cookie("userToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ success: true, accessToken, user });
  } catch (error) {
    //Passing the error to error handler
    next(error);
  }
}

function logout(req, res) {
  //Removing usertoken from cookie
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
    //Getting the ticket details from client
    const {
      requested_by,
      requestedId,
      subject,
      status,
      dueDate,
      assignee,
      assigneeId,
    } = req.body;

    //Creating the ticket
    const newTicket = await db.Ticket.create({
      requested_by,
      requestedId,
      subject,
      status,
      due_date: dueDate,
      assignee,
      assigneeId,
    });
    //Saving the ticket
    newTicket.save();
    res.json({ success: true, message: "Ticket created successfully" });
  } catch (error) {
    //Passing the error to error handler
    next(error);
  }
}

async function getAssignees(req, res, next) {
  try {
    // Extracting the user id from the request object
    const { id } = req.user;
    // Fetching assignees by the user
    const assignees = await db.User.findAll({
      where: {
        id: {
          [db.Sequelize.Op.not]: id,
        },
        email: {
          [db.Sequelize.Op.ne]: process.env.ADMINMAIL,
        },
      },
    });

    // Extracting data values from the assignees
    const userDetails = assignees.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    // Sending the response with the retrieved assignees data
    res.json({ success: true, userDetails });
  } catch (error) {
    //Passing the error to error handler
    next(error);
  }
}

async function getTickets(req, res, next) {
  try {
    // Extracting the user id from the request object
    const { id } = req.user;
    // Fetching tickets requested by the user
    const tickets = await db.Ticket.findAll({
      where: {
        requestedId: id,
      },
    });
    // Fetching tickets assigned to the user
    const assgnedTickets = await db.Ticket.findAll({
      where: {
        assigneeId: id,
      },
    });

    // Extracting data values from the requested tickets
    const ticketsDataValues = tickets.map((ticket) => ticket.dataValues);

    // Extracting data values from the assigned tickets
    const assignedValues = assgnedTickets.map((ticket) => ticket.dataValues);

    // Sending the response with the retrieved ticket data
    res.json({ success: true, ticketsDataValues, assignedValues });
  } catch (error) {
    //Passing the error to error handler
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
