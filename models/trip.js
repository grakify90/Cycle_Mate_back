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
      trip.belongsTo(models.user, { as: "Owner" });
      trip.belongsToMany(models.user, {
        through: "participants",
        foreignKey: "tripId",
        as: "Owner",
      });
    }
  }
  trip.init(
    {
      date: DataTypes.STRING,
      locationCity: DataTypes.STRING,
      locationProvince: DataTypes.STRING,
      lengthKM: DataTypes.INTEGER,
      numPeopleAllowed: DataTypes.INTEGER,
      typeBike: DataTypes.STRING,
      description: DataTypes.TEXT,
      tempo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "trip",
    }
  );
  return trip;
};
