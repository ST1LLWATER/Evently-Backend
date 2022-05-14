"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("suggestions", {
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("suggestions");
  },
};
