const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Product name is required',
    }),
    quantity: Joi.number().integer().min(0).required().message({
        'number.base': 'Quantitiy must be a number',
        'number.min': 'Quantity must be at least 0',
        'any.required': 'Quantity is required'
    }),
    price: Joi.number().precision(2).min(1).require().message({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be at least 0',
        'any.required': 'Price is required',
    })
});

module.exports = { productSchema };
