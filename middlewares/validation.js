const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Product name is required',
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantitiy must be a number',
        'number.min': 'Quantity must be at least 0',
        'any.required': 'Quantity is required'
    }),
    price: Joi.number().precision(2).min(1).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be at least 0',
        'any.required': 'Price is required'
    })
});

const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,}$';

const authenticationSchema = Joi.object({
    username: Joi.string().required().min(4).max(10).alphanum().messages({
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 4 characters long!',
        'string.max': 'Username must be maximum 10 characters long!',
        'string.alphanum': 'Username must containt only letters and numbers!'
    }),
    password: Joi.string().required().pattern(passwordPattern).messages({
        'string.empty': 'Password cannot be empty',
        'string.pattern':'Password must containt at least one lowercase letter, one uppercase letter, one number and one special symbol!',
    })
});

module.exports = { productSchema, authenticationSchema };
