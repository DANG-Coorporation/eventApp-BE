const express = require("express");
const EventController = require("../controller/eventsController");
const router = express.Router();

router.get("/events", EventController.getEvents);
router.get("/events/:id", EventController.getEventbyId);

module.exports = router;
