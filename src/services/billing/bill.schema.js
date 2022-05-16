const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.FundAccount = Joi.object().keys({
  amount: Joi.number().required(),
});
