const express = require("express");
const DashboardController = require("../controller/dashboardController");
const router = express.Router();

router
  .get("/dashboard/event-details", DashboardController.getDashboardTransaction)
  .get("/dashboard/:id", DashboardController.getDashboardInfo);

module.exports = router;
