const { Router } = require("express");
const users = require("./customer/user.route");
const bill = require("./billing/bill.route");
const billService = require("./billingWorker/billService.route");

module.exports = () => {
  const router = Router();

  router.use("/customers", users);
  router.use("/bill", bill);
  router.use("/service", billService);


  return router;
};
