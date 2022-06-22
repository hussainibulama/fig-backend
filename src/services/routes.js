const { Router } = require("express");
const users = require("./user/user.route");
const event = require("./event/event.route");
const bookings = require("./bookings/bookings.route");

module.exports = () => {
  const router = Router();

  router.use("/user", users);
  router.use("/event", event);
  router.use("/bookings", bookings);

  return router;
};
