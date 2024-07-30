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

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{4,}$/;

const registrationSchema = Joi.object({
    username: Joi.string().required().min(4).max(10).alphanum().messages({
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 4 characters long!',
        'string.max': 'Username must be maximum 10 characters long!',
        'string.alphanum': 'Username must containt only letters and numbers!'
    }),
    password: Joi.string().required().pattern(passwordPattern).messages({
        'string.empty': 'Password cannot be empty',
        'string.pattern.base':'Password must containt at least one lowercase letter, one uppercase letter, one number and one special symbol!'
    })
});

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username cannot be empty!',
        'string.alphanum': 'Username contains symbols that are not allowed!'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password field cannot be emtpy'
    })
});

module.exports = { productSchema, registrationSchema, loginSchema };
