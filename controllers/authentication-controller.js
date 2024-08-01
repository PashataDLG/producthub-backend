const authService = require('../services/authentication-service');

const register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        if(!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(200).json({ token: result.token });
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
        const result = await authService.logout(token);
        if(!result.success) {
            res.status(400).json({ message: result.message });
        };
        
        res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, logout };