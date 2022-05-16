const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");

/**
 * Creates a middleware to validate request payloads with Joi schemas
 */
module.exports = function validateRequest(schema, field = "body") {
  return function validateRequest(req, _res, next) {
    const result = schema.validate(req[field], {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    if (result.error) {
      const parsedResult = Array.isArray(result.error.details)
        ? result.error.details.map((error) => ({
            [String(error.path[0])]: error.message,
          }))
        : [
            {
              [String(result.error.message.split(" ")[0])]: result.error
                .message,
            },
          ];
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            code: HTTP.UNPROCESSABLE_ENTITY,
            message: "validation failed",
            data: parsedResult,
          },
        ])
      );
    }

    req[field] = result.value;
    return next();
  };
};
