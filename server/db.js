const { Sequelize } = require("sequelize");
const TicketModel = require("./models/ticket");
const UserModel = require("./models/user");

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "rootuser",
  password: "mysecret123",
  database: "ticketdb",
  host: "172.17.0.1",
  port: 5433,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

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

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
  testDatabaseConnection();
});

module.exports = db;
