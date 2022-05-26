const { User, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
  let allUsers = await User.findAll({ raw: true });
  allUsers = allUsers.map((user) => {
    return {
      ...user,
      roll_no: user.roll_no.toUpperCase(),
    };
  });

  return res
    .status(200)
    .json({ message: 'Users Fetched', success: true, allUsers });
};

exports.getRollNumberByYear = async (req, res) => {
  let { year } = req.query;
  let rollnumbers = await sequelize.query(
    `
  SELECT roll_no FROM users WHERE year IN (${year})
  `,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res
    .status(200)
    .json({ message: 'All Roll Numbers', success: true, rollnumbers });
};
