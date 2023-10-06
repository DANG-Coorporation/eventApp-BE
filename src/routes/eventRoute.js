const express = require("express");
const EventController = require("../controller/eventsController");
const { multerUpload } = require("../middleware/multer");
const errorHandler = require("../middleware/errorHandler");
const router = express.Router();

router
  .get("/events", EventController.getEvents)
  .get("/user-events", EventController.getEventbyUserId)
  .get("/events/:id", EventController.getEventbyId);
router;

router.post(
  "/events",
  multerUpload.single("img"),
  errorHandler,
  EventController.createEvent
);

module.exports = router;
