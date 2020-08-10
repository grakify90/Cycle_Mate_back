"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "topics",
      [
        {
          userId: 5,
          title: "How do I change my tire?",
          content: "I'm totally lost, please help",
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          title: "Show off your bike!",
          content: "Please show a picture :)",
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("topics", null, {});
  },
};
