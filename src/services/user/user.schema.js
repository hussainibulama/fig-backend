const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string().email().trim().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

exports.loginUserSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});
