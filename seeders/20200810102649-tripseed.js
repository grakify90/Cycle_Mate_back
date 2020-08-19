"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trips",
      [
        {
          userId: 1,
          date: new Date(2020, 10, 22),
          title: "Trip around the island",
          startingTime: "10:30",
          locationCity: "Dordrecht",
          locationProvince: "Zuid-Holland",
          precise: true,
          locationDetails:
            "Provincialeweg, Dordrecht, Zuid-Holland, Nederland, 3329, Nederland",
          latitude: 51.788373,
          longitude: 4.757371,
          lengthKM: 40,
          numPeopleAllowed: 5,
          typeBike: "Touring",
          description:
            "We will start at Kop van 't Land and from there go around the island of Dordrecht. Beautiful nature, a city centre full of architecture from the Middle Ages, Dordrecht has it all!",
          tempo: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          date: new Date(2020, 10, 28),
          title: "Windmills at Kinderdijk",
          startingTime: "10:30",
          locationCity: "Alblasserdam",
          locationProvince: "Zuid-Holland",
          precise: true,
          locationDetails:
            "Jan Smitkade, Alblasserdam, Zuid-Holland, Nederland, 2951JH, Nederland",
          latitude: 51.862098,
          longitude: 4.650974,
          lengthKM: 60,
          numPeopleAllowed: 10,
          typeBike: "Touring",
          description:
            "If you've never been to Kinderdijk, the typically Dutch views you'll encounter on this trip will amaze you!",
          tempo: "relaxed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          date: new Date(2020, 10, 29),
          title: "Through the woods and dunes",
          startingTime: "9:30",
          locationCity: "Kaatsheuvel",
          locationProvince: "Noord-Brabant",
          precise: true,
          locationDetails:
            "Roestelberg, Roestelbergseweg, Kaatsheuvel, Loon op Zand, Noord-Brabant, Nederland, 5171 RL, Nederland",
          latitude: 51.656181,
          longitude: 5.082758,
          lengthKM: 25,
          numPeopleAllowed: 4,
          typeBike: "Mountainbike",
          description:
            "We will enjoy the nice surroundings of the Loonse en Drunense Duinen. The mountainbike route is beautifully created through the woods and also partly in the sand. Let's enjoy it together!",
          tempo: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          date: new Date(2020, 10, 30),
          title: "Along the Rotte",
          startingTime: "10:00",
          locationCity: "Zevenhuizen",
          locationProvince: "Zuid-Holland",
          precise: true,
          locationDetails:
            "Tweemanspolder Molen No.4, Korenmolengat, Zevenhuizen, Zuidplas, Zuid-Holland, Nederland, 2761BK, Nederland",
          latitude: 52.020855,
          longitude: 4.558515,
          lengthKM: 50,
          numPeopleAllowed: 8,
          typeBike: "Road bike",
          description:
            "We will start at the Tweemanspolder Nr. 4 windmill, and go south from there, all the way to Rotterdam and back.",
          tempo: "athletic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          date: new Date(2020, 10, 31),
          title: "The Spínola route",
          startingTime: "11:00",
          locationCity: "Breda",
          locationProvince: "Noord-Brabant",
          precise: true,
          locationDetails:
            "Keizerstraat, Chassé, Centrum, Breda, Noord-Brabant, Nederland, 4811HL, Nederland",
          latitude: 51.585194,
          longitude: 4.778888,
          lengthKM: 75,
          numPeopleAllowed: 4,
          typeBike: "Road bike",
          description:
            "Starting from the heart of Breda, this route will take us along little villages, beautiful nature, and a ferry over the river Mark.",
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
