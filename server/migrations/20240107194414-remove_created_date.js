'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tickets', 'created_date');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, define a down migration to add back the column
    await queryInterface.addColumn('Tickets', 'created_date', {
      type: Sequelize.DATE,
      allowNull: true, // or false, depending on your requirements
    });
  },
};
