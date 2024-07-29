const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklisted-tokens-model');

const authenticate = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization')
        if (!authToken) {
            return res.status(401).json({ message: 'Access denied. No token provided. ' });
        };

        const token = authToken.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Invalid token format. ' });
        }

        const blacklistedToken = await Blacklist.findOne({ token });

        if(blacklistedToken) {
            return res.status(401).json({ message: 'Invalid token. ' });
        }

        const decoded = jwt.verify(token, 'jwt-secret');
        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(400).json({ message: 'Invalid token! ' });
    }
};

module.exports = authenticate;