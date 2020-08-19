"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Nina",
          lastName: "van Es",
          email: "ninavanes@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "New to cycling, but enjoying it a lot!",
          gender: "f",
          dateOfBirth: new Date(1990, 9, 19),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Johan",
          lastName: "van Es",
          email: "johanvanes@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Retired and going strong!",
          gender: "m",
          dateOfBirth: new Date(1949, 9, 19),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Henk",
          lastName: "Pluis",
          email: "henkpluis@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Cycling is my life!!!",
          gender: "m",
          dateOfBirth: new Date(1960, 2, 30),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Geertruida",
          lastName: "Jansen",
          email: "gjansen@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Old but gold",
          gender: "f",
          dateOfBirth: new Date(1940, 5, 13),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Kim",
          lastName: "Park",
          email: "kimpark@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe:
            "Recently came to Holland and would love to meet new people :)",
          gender: "m",
          dateOfBirth: new Date(1980, 7, 7),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jessica",
          lastName: "Lake",
          email: "jlake@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Here to enjoy cycling and practice my Dutch!",
          gender: "f",
          dateOfBirth: new Date(1995, 4, 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
