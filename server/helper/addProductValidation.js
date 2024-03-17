const Joi = require('joi');

// Define Joi schema for product validation with custom error messages
exports.productSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
        'string.empty': 'Description cannot be empty'
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number'
    })
});
