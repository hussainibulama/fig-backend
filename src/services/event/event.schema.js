const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.CreateEvent = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  date: Joi.date().format("YYYY-MM-DD").utc().required(),
  time: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  address: Joi.string().optional(),
});
