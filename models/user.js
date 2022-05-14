"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ Role }) {
      // define association here
      this.hasMany(Role, {
        foreignKey: "user_rollno",
        onDelete: "SET NULL",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      roll_no: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User Must Have A Name" },
          notEmpty: { msg: "Name Cannot Be Empty" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User Must Have A Username" },
          notEmpty: { msg: "Username Cannot Be Empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password Required" },
          notEmpty: { msg: "Password Cannot Be Empty" },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
