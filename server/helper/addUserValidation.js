const Joi = require('joi');
exports.addUserSchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z]+$/).required().messages({
        'string.required': 'Name is required',
        'string.pattern.base': 'Name should contain only alphabets'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email is not valid and must use vaild after dot like .com, .in etc!'
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 8 characters',
    })
});