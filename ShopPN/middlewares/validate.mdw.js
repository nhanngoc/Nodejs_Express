const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        tenkh: Joi.string().min(6).max(50).required(),
        username: Joi.string().min(6).max(50).required(),
        sdt: Joi.string().min(10).max(10).required().required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required(),
    })
    return rule.validate(data);
}

module.exports.registerValidator = registerValidator;