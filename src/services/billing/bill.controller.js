const { HTTP } = require("../../constants/http");
const { RESPONSE } = require("../../constants/response");
const createError = require("../../helpers/createError");
const { createResponse } = require("../../helpers/createResponse");
const BillService = require("./bill.service");

exports.FundAccount = async (req, res, next) => {
  const id = req.userId;
  try {
    const { error, message, data } = await BillService.funduser(
      id,
      req.body.amount
    );
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
