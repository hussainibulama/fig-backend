const { RESPONSE } = require("../constants/response");
const { HTTP } = require("../constants/http");

/**
 * Creates an error payload
 */

function createError(status, data) {
  return {
    status: data[0].status,
    message: data[0].message,
    data: data[0].data,
    stack: new Error().stack,
    statusCode: status,
  };
}

createError.InternalServerError = (data = null) =>
  createError(HTTP.SERVER_ERROR, [
    {
      status: RESPONSE.ERROR,
      message: data.message || "Internal Server Error.",
      data,
      stack: process.env.NODE === "development" ? new Error().stack : undefined,
    },
  ]);

module.exports = createError;
