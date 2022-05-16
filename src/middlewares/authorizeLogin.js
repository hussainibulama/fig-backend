const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const User = require("../services/customer/user.model");

exports.authorizeLogin = async (req, _, next) => {
  let email = String(req.body.email);
  try {
    let user = null;
      user = await User.findOne({
        $and: [
          {
            $or: [
              { phone_number: String(email) },
              { username: String(email) },
              { email: String(email) },
            ],
          },
        ],
      });

      if (!user) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.ERROR,
              message: `User does not Exist`,
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        req.user = user;
        next();
      }
    
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
