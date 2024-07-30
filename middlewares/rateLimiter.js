const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    mas: 5,
    message: 'Too many login attemtps from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = loginLimiter