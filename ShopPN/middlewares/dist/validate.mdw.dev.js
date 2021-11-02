"use strict";

var Joi = require('joi');

var registerValidator = function registerValidator(data) {
  var rule = Joi.object({
    tenkh: Joi.string().min(6).max(50).required(),
    username: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required()
  });
  return rule.validate(data);
};

module.exports.registerValidator = registerValidator;