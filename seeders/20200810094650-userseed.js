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
          email: "ninavanes1990@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Hello I love cycling <3",
          gender: "f",
          dateOfBirth: new Date(1990, 10, 18),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Johan",
          lastName: "van Es",
          email: "johanvanes@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Retired and roaring",
          gender: "m",
          dateOfBirth: new Date(1949, 10, 18),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Henk",
          lastName: "van Es",
          email: "henk@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Retired and roaring",
          gender: "m",
          dateOfBirth: new Date(1930, 10, 30),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Greet",
          lastName: "van Es",
          email: "greet@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Retired and roaring",
          gender: "f",
          dateOfBirth: new Date(1960, 10, 13),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Keesje",
          lastName: "van Es",
          email: "keesje@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Retired and roar",
          gender: "m",
          dateOfBirth: new Date(1956, 10, 18),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "San",
          lastName: "van Es",
          email: "san@hotmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          aboutMe: "Rrrrrrrr",
          gender: "f",
          dateOfBirth: new Date(1958, 10, 18),
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
