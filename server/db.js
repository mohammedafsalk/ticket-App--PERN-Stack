const { Sequelize } = require("sequelize");
const TicketModel = require("./models/ticket");
const UserModel = require("./models/user");

// Initialize Sequelize with database connection details
const sequelize = new Sequelize({
  dialect: "postgres", // Using PostgreSQL as the database
  username: "rootuser", // Database username
  password: "mysecret123", // Database password
  database: "ticketdb", // Database name
  host: "172.17.0.1", // Database host
  port: 5433, // Database port
});

// Create an object to store Sequelize and sequelize instances along with models
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define Ticket and User models using the provided sequelize instance and Sequelize class
db.Ticket = TicketModel(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Synchronize the models with the database (create tables if they do not exist)
sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
  testDatabaseConnection();
});

module.exports = db;
