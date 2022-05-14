"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Event }) {
      this.belongsTo(User, { foreignKey: "user_rollno", targetKey: "roll_no" });
      this.belongsTo(Event, { foreignKey: "event_id", targetKey: "event_id" });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      user_rollno: {
        type: DataTypes.STRING,
        primaryKey: true,
        foreignKey: true,
        references: {
          model: "users",
          key: "roll_no",
        },
      },
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        references: {
          model: "events",
          key: "event_id",
        },
      },
      role: {
        // type: DataTypes.ARRAY(DataTypes.STRING),
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: false,
    }
  );
  return Role;
};
