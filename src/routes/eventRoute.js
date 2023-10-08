const express = require("express");
const EventController = require("../controller/eventsController");
const { multerUpload } = require("../middleware/multer");
const errorHandler = require("../middleware/errorHandler");

const router = express.Router();

router
  .get("/events/:id", EventController.getEventbyId)
  .get("/events", EventController.getEvents)
  .get("/events/:name", EventController.searchEvent)
  .get("/user-events", EventController.getEventbyUserId);
router;

router.post(
  "/events",
  multerUpload.single("img"),
  errorHandler,
  EventController.createEvent
);

module.exports = router;
