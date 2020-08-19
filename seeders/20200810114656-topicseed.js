"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "topics",
      [
        {
          userId: 4,
          title: "Flat tire...now what?",
          content: "I'm totally lost, please help!",
          imageUrl:
            "https://www.sefiles.net/merchant/364/images/site/3130061151_89c05e6440.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Show off your bike!",
          content: "This is mine :)",
          imageUrl:
            "https://cdn.road.cc/sites/default/files/cropped/preview_500/images/Hewitt%20Cheviot%20SE/Hewitt%20Cheviot%20SE.jpg",
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
