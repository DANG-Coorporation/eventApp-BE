const express = require("express");
const TransactionController = require("../controller/transactionController");
const router = express.Router();

router
  .get("/transactions", TransactionController.getTransactions)
  .post("/transactions", TransactionController.createTransaction);

module.exports = router;
