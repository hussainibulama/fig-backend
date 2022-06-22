const { HTTP } = require("../../constants/http");
const { RESPONSE } = require("../../constants/response");
const createError = require("../../helpers/createError");
const { createResponse } = require("../../helpers/createResponse");
const BookingService = require("./bookings.service");

exports.BookEvent = async (req, res, next) => {
  const id = req.userId;
  const user = req.user;
  try {
    const { error, message, data } = await BookingService.BookEvent({
      user_id: id,
      event_id: req.body.event_id,
      user_email: user.email,
      event_title: req.body.event_title,
      event_location: req.body.event_location,
    });
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode:
              data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.CREATED);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
exports.UserEvents = async (req, res, next) => {
  const id = req.userId;
  try {
    const { error, message, data } = await BookingService.UserEvents(id);
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode:
              data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.CREATED);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
