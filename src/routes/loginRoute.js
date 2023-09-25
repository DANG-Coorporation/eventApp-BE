const express = require("express");
const Validator = require("../middleware/validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", Validator.validateLogin, async (req, res) => {
  try {
    console.log(req.userObj);
    const token = jwt.sign(req.userObj, process.env.JWT_TOKEN);
    res.status(200).json({
      status: 200,
      message: "login success",
      token: token,
    });
    console.log("succes");
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: e.toString(),
    });
  }
});

module.exports = router;
