const db = require("../database/models");

class TransactionController {
  static async createTransaction(req, res) {
    try {
      const body = req.body;
      console.log(body);
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

  static async getTransactions(req, res) {
    try {
      console.log("hre");
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
}

module.exports = TransactionController;
