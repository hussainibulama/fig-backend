const { hashPassword, comparePassword } = require("../../helpers/password");
const { jwtSign } = require("../../helpers/token");
const User = require("./user.model");

exports.registerUser = async (res, data) => {
  let user;
  try {
    const password = hashPassword(data.password);
    const email = data.email && data.email.toLowerCase();

    user = await User.create({
      ...data,
      password,
      ...(email && { email }),
    });
    return {
      error: !user,
      message: !user ? "Failed to register user" : "Registration successful",
      data: !user ? null : user,
    };
  } catch (err) {
    user && user.deleteOne();
    console.log(err?.response?.data || err);
    db.referrals.find;
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};

exports.loginUser = async (user, data) => {
  try {
    const passwordMatch = await comparePassword(user.password, data.password);
    if (!passwordMatch) {
      return {
        error: true,
        message: "Incorrect password.",
      };
    }

    const accessToken = jwtSign(user._id);
    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        last_issued_at: new Date(),
      }
    );

    return {
      error: !user,
      message: !user ? "Failed to login user" : "Login successful",
      data: !user ? null : { accessToken },
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Error logging user at this time",
      data: err,
    };
  }
};
