const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication-controller.js');
const authenticate = require('../middlewares/auth.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

module.exports = router;