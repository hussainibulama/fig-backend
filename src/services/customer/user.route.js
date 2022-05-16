const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const userSchema = require("./user.schema");
const userController = require("./user.controller");
const { authorizeLogin } = require("../../middlewares/authorizeLogin");
const { checkExistingUser } = require("../../middlewares/checkExistingUser");


const router = Router();
router.post(
  "/register",
  validateRequest(userSchema.registerUserSchema, "body"),
  checkExistingUser,
  userController.registerUserController
);

router.post(
  "/login",
  validateRequest(userSchema.loginUserSchema, "body"),
  authorizeLogin,
  userController.loginUserController
);



module.exports = router;
