const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklisted-tokens-model.js');


const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        };

        await User.create({ username, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials! ' });
        }

        const token = jwt.sign({ id: user._id }, 'jwt-secret', { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided!' });
    };

    const token = authHeader.replace('Bearer ', '');

    try {
        await Blacklist.create({ token });
        res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, logout };