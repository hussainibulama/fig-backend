const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const billController = require("./billService.controller");


const router = Router();
router.post(
  "/bill",
    billController.FundAccount
);




module.exports = router;
