const db = require("../database/models");

class TransactionController {
  static async createTransaction(req, res) {
    try {
      const body = req.body;
      await db.Transaction.create(body);
      res.status(200).json({
        status: 200,
        message: "Transaction was created succesfully",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Failed to create transaction",
        error: e.toString(),
      });
    }
  }

  static async getTransactions(req, res, next) {
    if (Object.keys(req.query).length > 0) {
      return next();
    }
    try {
      const transactions = await db.Transaction.findAll();
      res.status(200).json({
        status: 200,
        message: "Request was succesfull",
        error: null,
        data: transactions,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: e.toString(),
      });
    }
  }

  static async getTransactionPermission(req, res) {
    try {
      const { event_id, user_id } = req.query;

      const event = await db.Event.findOne({
        raw: true,
        where: {
          id: event_id,
          user_id: user_id,
        },
      });

      if (event) {
        return res.status(200).json({
          status: 200,
          message: "Request was succesfull",
          error: null,
          data: {
            permission: false,
            owner: true,
          },
        });
      }

      const transactions = await db.Transaction.findOne({
        where: {
          event_id: event_id,
          user_id: user_id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "Request was succesfull",
        error: null,
        data: { permission: transactions ? false : true, owner: false },
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: e.toString(),
      });
    }
  }

  static async getTransactionByUserId(req, res, next) {
    try {
      const userId = req.params.id;
      const transactions = await db.Transaction.findAll({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Request was succesfull",
        error: null,
        data: transactions,
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

module.exports = TransactionController;
