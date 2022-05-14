"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event }) {
      // define association here
      this.belongsTo(Event, { foreignKey: "event_id", targetKey: "event_id" });
    }
  }
  Suggestion.init(
    {
      suggestion_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      suggestion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Suggestion",
      tableName: "suggestions",
      timestamps: false,
    }
  );
  return Suggestion;
};
