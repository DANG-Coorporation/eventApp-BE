const express = require("express");
const Validator = require("../middleware/validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", Validator.validateLogin, async (req, res) => {
  try {
    const token = jwt.sign(req.userObj, "secret");
    console.log(token);
    const decoded = jwt.decode(token);
    console.log(decoded);
  } catch (e) {
    res.status(500).json({
      code: 500,
      error: e.toString(),
    });
  }
});

module.exports = router;
