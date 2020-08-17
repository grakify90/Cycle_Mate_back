"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trip.belongsTo(models.user, { as: "owner", foreignKey: "userId" });
      trip.belongsToMany(models.user, {
        through: "participants",
        foreignKey: "tripId",
        as: "participant",
      });
    }
  }
  trip.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startingTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationProvince: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lengthKM: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numPeopleAllowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeBike: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tempo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "trip",
    }
  );
  return trip;
};
