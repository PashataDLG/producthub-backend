const User = require('../models/user-model.js');

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

module.exports = { register };