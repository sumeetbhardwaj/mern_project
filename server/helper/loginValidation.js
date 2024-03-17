const Joi = require('joi');

exports.loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Invalid credentials'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Invalid credentials'
    })
});
