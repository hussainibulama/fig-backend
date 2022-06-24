const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const eventSchema = require("./event.schema");
const eventController = require("./event.controller");
const { checkAuth } = require("../../middlewares/checkAuth");
const uploadFile = require("../../helpers/awss3");

const router = Router();
router.post(
  "/create-event",
  uploadFile(),
  validateRequest(eventSchema.CreateEvent, "body"),
  // checkAuth,
  eventController.CreateEvent
);

router.get(
  "/search-event",
  // validateRequest(eventSchema.CreateEvent, "query"),
  checkAuth,
  eventController.SearchEvent
);

module.exports = router;
