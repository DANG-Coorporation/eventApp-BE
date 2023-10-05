const express = require("express");
const EventController = require("../controller/eventsController");
const router = express.Router();

router
  .get("/events/:id", EventController.getEventbyId)
  .get("/events", EventController.getEvents)
  .get("/user-events", EventController.getEventbyUserId);
router;

module.exports = router;
