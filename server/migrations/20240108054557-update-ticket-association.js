'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tickets', 'requestedId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, provide a way to revert the changes
    // This will depend on your specific requirements
  },
};
