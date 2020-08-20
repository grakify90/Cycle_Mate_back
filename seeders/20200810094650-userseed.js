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
          dateOfBirth: "18-10-1990",
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
          dateOfBirth: "18-10-1949",
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
          dateOfBirth: "03-03-1969",
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
          dateOfBirth: "01-12-1940",
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
          dateOfBirth: "07-07-1980",
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
          dateOfBirth: "03-11-1995",
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
