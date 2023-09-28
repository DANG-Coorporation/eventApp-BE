const express = require("express");
const Validator = require("../middleware/validator");
const LoginController = require("../controller/loginController");
const router = express.Router();

router.post("/login", Validator.validateLogin, LoginController);

module.exports = router;
