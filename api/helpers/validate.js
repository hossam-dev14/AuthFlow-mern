const joi = require('joi');

// Define a validation schema for the request body

const validateSignup = (user) => {
    const sipnUpSchema = joi.object({
        username: joi.string().required().min(3),
        email: joi.string().required(),
        password: joi.string().required().min(8)
    })

    return sipnUpSchema.validate(user)
}


const validateLogin = (user) => {
    const loginSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required().min(8)
    })

    return loginSchema.validate(user)
}

module.exports = {
    validateLogin,
    validateSignup
}