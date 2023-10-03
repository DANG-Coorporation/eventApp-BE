const db = require("../database/models");

class EventController {
  static async getEvents(req, res) {
    try {
      const events = await db.Event.findAll({
        raw: true,
      });
      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: events,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  }

  static async getEventbyId(req, res) {
    try {
      const event = await db.Event.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: event,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  }
}

module.exports = EventController;
