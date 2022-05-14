"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Suggestion, Role }) {
      // define association here
      this.hasMany(Suggestion, { foreignKey: "event_id" });
      this.hasMany(Role, { foreignKey: "event_id" });
    }
  }
  Event.init(
    {
      event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Event Must Have A Name" },
          notEmpty: { msg: "Name Cannot Be Empty" },
        },
      },
      managers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Event Must Have Some Description" },
          notEmpty: { msg: "Description Cannot Be Empty" },
        },
      },
      year: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scheduled_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meet_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
    }
  );
  return Event;
};
