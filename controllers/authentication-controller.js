const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists ' });
        };

        const user = await User.create({ username, password });
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
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };