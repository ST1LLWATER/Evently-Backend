var express = require('express');
const { getAllUsers, getRollNumberByYear } = require('../controllers/user');
var router = express.Router();

/* GET users listing. */

router.get('/all', getAllUsers);
router.get('/rollnumbers', getRollNumberByYear);

module.exports = router;
