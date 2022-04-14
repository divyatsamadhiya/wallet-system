const Joi = require("joi");

const userValidate = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { userValidate, loginValidate };
