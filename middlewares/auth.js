const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const authToken = req.header('Authorization')
        if (!authToken) {
            return res.status(401).json({ message: 'Access denied. No token provided. ' });
        };

        const token = authToken.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Invalid token format. ' });
        }


        const decoded = jwt.verify(token, 'jwt-secret');
        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(400).json({ message: 'Invalid token! ' });
    }
};

module.exports = authenticate;