const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.BookEvent = Joi.object().keys({
  user_id: Joi.string().optional(),
  event_id: Joi.string().required(),
  user_email: Joi.string().email().trim().optional(),
  event_title: Joi.string().required(),
  event_location: Joi.string().required(),
});
