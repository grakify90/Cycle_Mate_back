"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "participants",
      [
        {
          userId: 1,
          tripId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tripId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          tripId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          tripId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tripId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          tripId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          tripId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tripId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          tripId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          tripId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("participants", null, {});
  },
};
