const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/auth');

router.post('/auth/register', signup); //Sign Up Route
router.post('/auth/login', login); //Login Route
router.get('/auth/logout', logout); //Logut Route

module.exports = router;
