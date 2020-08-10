'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      locationCity: {
        type: Sequelize.STRING
      },
      locationProvince: {
        type: Sequelize.STRING
      },
      lengthKM: {
        type: Sequelize.INTEGER
      },
      numPeopleAllowed: {
        type: Sequelize.INTEGER
      },
      typeBike: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      tempo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trips');
  }
};