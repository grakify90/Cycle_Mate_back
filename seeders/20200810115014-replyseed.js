"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "replies",
      [
        {
          userId: 4,
          topicId: 1,
          content: "I'll help you :)",
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          topicId: 2,
          content: "Here's mine ;)",
          imageUrl:
            "https://s14761.pcdn.co/wp-content/uploads/sites/3/2020/04/Pinarello-Dogma-F12-test-review-2020-014-257-1140x760.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("replies", null, {});
  },
};
