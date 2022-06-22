const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const eventSchema = require("./bookings.schema");
const eventController = require("./bookings.controller");
const { checkAuth } = require("../../middlewares/checkAuth");

const router = Router();
router.post(
  "/create-book",
  validateRequest(eventSchema.BookEvent, "body"),
  checkAuth,
  eventController.BookEvent
);
router.get(
  "/find-book",
  // validateRequest(eventSchema.CreateEvent, "query"),
  checkAuth,
  eventController.UserEvents
);

module.exports = router;
