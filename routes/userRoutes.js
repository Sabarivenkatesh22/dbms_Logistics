const express = require('express');
const userController = require('./../controllers/userController');
const emailController = require('./../controllers/emailController');
// const authController = require('./../controllers/authController');
const router = express.Router();
// router.param('id');
// router.route('/:id').get();
// router.route('/').get(userController.getAllUsers).post(userController.createUsers);

// students registering 
router.route('/register').post(userController.addUser);

// watchman looking for student details
router.route('/checkUser').post(userController.findUser);

// send email 
router.route('/sendMail').post(emailController.sendVerifyToken);

// check otp
router.route('/checkOTP').post(emailController.checkToken);
module.exports = router;