'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event }) {
      // define association here
      this.belongsTo(Event, { foreignKey: 'event_id', targetKey: 'event_id' });
    }
  }
  Report.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Report',
      tableName: 'reports',
      timestamps: false,
    }
  );
  return Report;
};
