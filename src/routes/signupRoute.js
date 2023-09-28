const express = require("express");
const Validator = require("../middleware/validator");
const router = express.Router();
const signupController = require("../controller/singupController");

router.post("/signup", Validator.validateSignUp, signupController);

module.exports = router;
