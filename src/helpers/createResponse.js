/**
 * Creates a reusable response payload
 *
 * @returns Response
 */
exports.createResponse =
  (message, data = [], status = "success") =>
  (res, code) => {
    return res.status(code).json({ code, status, message, data });
  };
