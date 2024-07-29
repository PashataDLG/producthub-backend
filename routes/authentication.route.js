const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication-controller.js');
const authenticate = require('../middlewares/auth.js');
const validateLogin = require('../middlewares/validateLogin.js');
const validateRegistration = require('../middlewares/validateRegistration.js');

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authenticate, authController.logout);

module.exports = router;