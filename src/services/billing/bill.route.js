const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const billSchema = require("./bill.schema");
const billController = require("./bill.controller");
const { checkAuth } = require("../../middlewares/checkAuth");

const router = Router();
router.post(
  "/fundaccount",
  validateRequest(billSchema.FundAccount, "body"),
  checkAuth,
  billController.FundAccount
);




module.exports = router;
