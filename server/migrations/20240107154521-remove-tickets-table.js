'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      // Define the columns and constraints for the Tickets table
      // ... (use the same structure as your original migration)
    });
  },
};
