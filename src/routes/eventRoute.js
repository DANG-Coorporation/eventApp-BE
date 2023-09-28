const express = require("express");
const EventController = require("../controller/eventsController");
const router = express.Router();

router.get("/events", EventController.getEventsController);
router.get("/events/:id", EventController.getEventbyIdController);

module.exports = router;
