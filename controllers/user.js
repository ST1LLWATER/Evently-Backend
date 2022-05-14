const { User } = require('../models');
const bcrypt = require('bcryptjs');
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
