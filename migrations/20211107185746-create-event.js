/* eslint-disable no-unused-vars */
"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("events", {
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
      },
      managers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("events");
  },
};
