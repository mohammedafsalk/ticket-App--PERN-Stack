"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.user, {
        as: "requestedByUser",
        foreignKey: "requestedId",
      });
      Ticket.belongsTo(models.user, {
        as: "assigneeUser",
        foreignKey: "assigneeId",
      });
    }
  }
  Ticket.init(
    {
      requested_by: DataTypes.STRING,
      requestedId: DataTypes.INTEGER,
      subject: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: DataTypes.STRING,
      assignee: DataTypes.STRING,
      assigneeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
