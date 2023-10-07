const { Op, where } = require("sequelize");
const db = require("../database/models");
const moment = require("moment/moment");
const generateOneDayRange = require("../utils/generateOneDayRange");

class DashboardController {
  static async getDashboardInfo(req, res) {
    try {
      const userId = req.params.id;
      const check = await db.Event.findAll({
        raw: true,
        where: {
          user_id: userId,
        },
      });

      if (check.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "Request was succesfull",
          error: null,
          data: {},
        });
      }
      const tickets = await db.Event.findAll({
        raw: true,
        where: {
          user_id: userId,
        },
        attributes: [
          [db.sequelize.fn("SUM", db.sequelize.col("quota")), "tickets_sum"],
        ],
      });

      const booked = await db.Event.findAll({
        raw: true,
        where: {
          user_id: userId,
        },
        include: {
          model: db.Transaction,
          as: "transaction",
          attributes: [],
        },
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("transaction.qty")),
            "transaction_sum",
          ],
        ],
      });

      const paid = await db.Event.findAll({
        raw: true,
        where: {
          user_id: userId,
        },
        include: {
          model: db.Transaction,
          as: "transaction",
          where: {
            isTransactionCompleted: true,
          },
          attributes: [],
        },
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("transaction.qty")),
            "transaction_paid_sum",
          ],
        ],
      });

      const income = await db.Event.findAll({
        raw: true,
        where: {
          user_id: userId,
        },
        include: {
          model: db.Transaction,
          as: "transaction",
          where: {
            isTransactionCompleted: true,
          },
          attributes: [],
        },
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("transaction.bill")),
            "transaction_bill_sum",
          ],
        ],
      });

      const datelist = [
        generateOneDayRange(4),
        generateOneDayRange(3),
        generateOneDayRange(2),
        generateOneDayRange(1),
        generateOneDayRange(),
      ];
      const graph_data = [];

      for (const date of datelist) {
        const transactions = await db.Event.findAll({
          raw: true,
          where: {
            user_id: userId,
          },
          include: {
            model: db.Transaction,
            as: "transaction",
            where: {
              isTransactionCompleted: true,
              buy_date: {
                [Op.between]: date,
              },
            },
            attributes: ["qty"],
          },

          attributes: [
            [
              db.sequelize.fn("SUM", db.sequelize.col("transaction.qty")),
              "today_booked",
            ],
          ],
        });

        const ticket_sold = transactions[0].today_booked ?? 0;
        const obj = {
          name: date[0].split(" ")[0],
          ticket_sold,
        };
        graph_data.push(obj);
      }

      //   console.log(booksWithinDate);
      const tickets_quota = parseInt(tickets[0].tickets_sum ?? 0);
      const tickets_booked = parseInt(booked[0].transaction_sum ?? 0);
      const tickets_paid = parseInt(paid[0].transaction_paid_sum ?? 0);
      const tickets_income = parseInt(income[0].transaction_bill_sum ?? 0);

      res.status(200).json({
        status: 200,
        message: "Request was succesfull",
        error: null,
        data: {
          tickets_quota,
          tickets_booked,
          tickets_paid,
          tickets_income,
          graph_data,
        },
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: e.toString(),
      });
    }
  }
}

module.exports = DashboardController;
