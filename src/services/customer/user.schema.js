const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
  phone_number: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .trim()
    .required()
    .label("Phone number"),
  password: Joi.string().required(),
  email: Joi.string().email().trim().required(),
  username: Joi.string()
    .trim()
    .when("email", {
      not: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .label("username or email"),

});

exports.loginUserSchema = Joi.object({
  email: Joi.string().trim().optional().label("email"),
  username: Joi.string().trim().optional().label("username"),
  phone_number: Joi.string().trim().optional().label("phone_number"),
  password: Joi.string().required(),
})
  .xor("email", "username", "phone_number")
  .label("field");
