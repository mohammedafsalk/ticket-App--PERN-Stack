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

    //Generating acces token for admin
    const accessToken = generateAccessToken(admin);

    //Storing the access token in cookies and sending the response
    res
      .cookie("adminToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ success: true, accessToken, admin });
  } catch (error) {
    // Passing the error to the error handler middleware
    next(error);
  }
}

function logout(req, res) {
  //Clearing the admins token from cookies
  res
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged out", error: false });
}

async function getDetails(req, res, next) {
  try {
    // Counting the number of users (excluding the admin)
    const userCount = await db.User.count({
      where: {
        email: {
          [db.Sequelize.Op.ne]: process.env.ADMINMAIL,
        },
      },
    });

    // Fetching all ticket data from the database
    const ticketData = await db.Ticket.findAll();

    // Extracting data values from the fetched ticket data
    const tickets = ticketData.map((ticket) => ticket.dataValues);

    // Sending the response with the retrieved user count and ticket details
    res.json({ success: true, userCount, tickets });
  } catch (error) {
    // Passing the error to the error handler middleware
    next(error);
  }
}

async function updateTicket(req, res, next) {
  try {
    // Destructuring values from the request body
    const { value, id } = req.body.value;

    // Finding the ticket in the database by its primary key (id)
    const ticket = await db.Ticket.findByPk(id);

    // Checking if the ticket exists
    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    // Updating the status of the ticket with the provided value
    await ticket.update({ status: value });

    // Sending a success response after updating the ticket
    res.json({ success: true, message: "Updated ticket" });
  } catch (error) {
    // Passing the error to the error handler middleware
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
  getDetails,
  updateTicket,
};
