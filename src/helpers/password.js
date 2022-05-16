const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

exports.comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};
