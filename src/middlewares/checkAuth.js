const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const { jwtVerify } = require("../helpers/token");
const User = require("../services/customer/user.model");


exports.checkAuth = async (req, _, next) => {
  const message = "Unauthorized";
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {

    const { id } = jwtVerify(token) || {};

    const user = await User.findById(id);

    if (!user) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }


    if (user) {
      req.userId = id;
      req.user = user;
      req.token = token;
      return next();
    }

    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError());
  }
};
