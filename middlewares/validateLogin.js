const { loginSchema } = require('./validation.js');

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);

    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validateLogin;