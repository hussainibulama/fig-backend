const mongoose = require("mongoose");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const User = require("../services/customer/user.model");

exports.checkExistingUser = async (req, _, next) => {
  let { username, email, phone_number, type } = req.body;

  try {
    const userEmail =
      email && (await User.findOne({ email: email.toLowerCase()}));
    const userName =
      username && (await User.findOne({ username: username}));
    const phoneNumber = phone_number && (await User.findOne({ phone_number}));

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

    if (
      userName &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `${type} with this username already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }

    if (
      phoneNumber &&
      (req.userId ? !userName._id.equals(req.userId) : !req.userId)
    ) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `${type} with this phone number already exists`,
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
