const { Sequelize } = require("sequelize");
const db = require("../database/models");

class EventController {
  static async getEvents(req, res, next) {
    if (Object.keys(req.query).length > 0) {
      return next();
    }
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

  static async getEventbyUserId(req, res) {
    const { user_id, association } = req.query;
    console.log(req.query);
    let events = null;
    try {
      if (association === "false") {
        events = await db.Event.findAll({
          where: {
            user_id: user_id,
          },
        });
      } else {
        events = await db.Event.findAll({
          where: {
            user_id: user_id,
          },
          group: "id",
          include: {
            model: db.Transaction,
            as: "transaction",
            attributes: [
              [
                Sequelize.literal(
                  `SUM(CASE isTransactionCompleted WHEN true THEN qty ELSE 0 END)`
                ),
                "tickets_sold",
              ],
            ],
            group: "id",
          },
          attributes: [
            "id",
            "user_id",
            "event_name",
            "quota",
            "start_date",
            "end_date",
            "price",
            "img",
          ],
        });
      }

      if (events[0].dataValues.transaction.length === 0) {
      }

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

  static async createEvent(req, res) {
    try {
      const data = req.body;
      const imageFile = req.file;

      await db.Event.create({
        user_id: data.user_id,
        event_name: data.event_name,
        event_category: data.event_category,
        ticket_type: data.ticket_type,
        start_date: data.start_date,
        end_date: data.end_date,
        location: data.location,
        event_place: data.event_place,
        description: data.description,
        price: data.price,
        quota: data.quota,
        img: imageFile ? imageFile?.filename : "",
      });
      res.status(200).json({
        status: 200,
        message: "Create Event Success",
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Create Event Failed",
        error: e.toString(),
      });
    }
  }
}

module.exports = EventController;
