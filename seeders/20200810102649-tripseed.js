"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trips",
      [
        {
          userId: 1,
          date: new Date(2020, 8, 20),
          title: "Trip around the island",
          startingTime: "13:30",
          locationCity: "Dordrecht",
          locationProvince: "Zuid-Holland",
          lengthKM: 80,
          numPeopleAllowed: 5,
          typeBike: "touring bike",
          description: "Nice bike trip",
          tempo: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          date: new Date(2020, 8, 22),
          title: "Through the woods and dunes",
          startingTime: "8:30",
          locationCity: "Loonse en Drunense Duinen",
          locationProvince: "Noord-Brabant",
          lengthKM: 25,
          numPeopleAllowed: 4,
          typeBike: "mountainbike",
          description: "Nice ride in the sand.",
          tempo: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          date: new Date(2020, 8, 23),
          title: "Rottemeren and the beach",
          startingTime: "11:00",
          locationCity: "Rotterdam",
          locationProvince: "South-Holland",
          lengthKM: 120,
          numPeopleAllowed: 10,
          typeBike: "road bike",
          description: "Let's go!",
          tempo: "athletic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trips", null, {});
  },
};
