const express = require('express');
// const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

// register new user
router.route('/').post(userController.addUser);
router.route('/')


module.exports = router;