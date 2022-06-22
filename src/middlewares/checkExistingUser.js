const mongoose = require("mongoose");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const User = require("../services/user/user.model");

exports.checkExistingUser = async (req, _, next) => {
  let { email, type } = req.body;
  try {
    const userEmail =
      email && (await User.findOne({ email: email.toLowerCase() }));

    if (
      userEmail &&
      (req.userId ? !userEmail._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `${type} with this email already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    return next();
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
