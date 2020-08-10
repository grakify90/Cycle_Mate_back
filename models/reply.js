"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reply.belongsTo(models.topic);
      reply.belongsTo(models.user);
    }
  }
  reply.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "reply",
    }
  );
  return reply;
};
