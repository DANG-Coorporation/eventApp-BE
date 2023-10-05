const express = require("express");
const {createReview, getReview, editReview} = require("../controller/reviewController");
const router = express.Router();

router.get("/review", getReview);
router.post("/review", createReview);
router.patch("/review", editReview)

module.exports = router;
