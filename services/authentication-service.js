const User = require('../models/User-Model.js');
const jwt = require('jsonwebtoken');
const Blacklist = require('../models/BlacklistedTokens-Model.js');

const register = async (userInfo) => {
    try {
        const { username, password } = userInfo;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            throw new Error('Username is already taken');
        };

        const createdUser = await User.create({ username, password });

        return createdUser;
    } catch (error) {
        throw error;
    }
};

const login = async (userInfo) => {
    try {
        const { username, password } = userInfo;

        const user = await User.findOne({ username });

        if (!user || !(user.comparePassword(password))) {
            return { success: false, message: 'Invalid username or password' };
        }

        const token = jwt.sign({ id: user._id, createdAt: user.createdAt }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { success: true, token: token };
    } catch (error) {
        console.error('Error during login: ', error);

        return { success: false, message: 'Failed to login' };
    }
};

const logout = async (userToken) => {
    try {
        const blacklistedToken = Blacklist.create({ token: userToken });
        return { success: true, blacklistedToken };
    } catch (error) {
        console.error('Error during lgoout: ', error);
        return { success: false, message: 'Invalid token' };
    }
};


module.exports = { register, login, logout };