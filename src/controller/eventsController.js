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
}

module.exports = EventController;
