const jwt = require("jsonwebtoken");

exports.jwtSign = (id) => {
  return jwt.sign({ id }, "egfdgsdgfdewoptjwrepotopw", {
    expiresIn: "1h",
  });
};

exports.jwtVerify = (token) => {
   try {
     return jwt.verify(token, "egfdgsdgfdewoptjwrepotopw");
   } catch (err) {
     console.log(err);
     return {};
   }
};

exports.jwtDecode = (token) => {
	try {
    return jwt.decode(token);
  } catch (err) {
    console.log(err);
    return {};
  }
}
