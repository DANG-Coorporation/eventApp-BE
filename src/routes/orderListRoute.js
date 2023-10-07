const express = require("express");
const {getOrderedList} = require("../controller/orderListController");
const router = express.Router();

router.get("/order-list/:user_id", getOrderedList);
module.exports = router;
