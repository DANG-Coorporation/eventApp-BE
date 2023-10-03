const express = require("express");
const EventController = require("../controller/eventsController");
const router = express.Router();

router
  .get("/events", EventController.getEvents)
  .get("/user-events", EventController.getEventbyUserId)
  .get("/events/:id", EventController.getEventbyId);
router;

module.exports = router;
