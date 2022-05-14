"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("roles", {
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
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("roles");
  },
};
