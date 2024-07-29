const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication-controller.js');
const validateRegistration = require('../middlewares/validateRegistration.js');
const validateLogin = require('../middlewares/validateLogin.js');

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

module.exports = router;