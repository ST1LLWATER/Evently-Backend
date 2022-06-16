'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('reports', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator_roll_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      report: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('reports');
  },
};
