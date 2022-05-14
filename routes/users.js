var express = require('express');
const { QueryTypes } = require('sequelize');
const { getAllUsers } = require('../controllers/user');
var router = express.Router();
const { User, sequelize } = require('../models');

/* GET users listing. */

router.get('/all', getAllUsers);

router.get('/rollnumbers', async (req, res) => {
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
});

module.exports = router;
