const express = require("express");
const DashboardController = require("../controller/dashboardController");
const router = express.Router();

router.get("/dashboard/:id", DashboardController.getDashboardInfo);

module.exports = router;
