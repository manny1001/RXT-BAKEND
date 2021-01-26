"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("users", "uuid", {
      type: Sequelize.DataTypes.STRING,
    }),
      queryInterface.addColumn("drivers", "uuid", {
        type: Sequelize.DataTypes.STRING,
      }),
      queryInterface.addColumn("trips", "uuidUser", {
        type: Sequelize.DataTypes.STRING,
      }),
      queryInterface.addColumn("trips", "uuidDriver", {
        type: Sequelize.DataTypes.STRING,
      });
    queryInterface.addColumn("trips", "uuidTrip", {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
