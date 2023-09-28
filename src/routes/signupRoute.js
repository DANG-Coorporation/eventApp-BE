const express = require("express");
const Validator = require("../middleware/validator");
// const Users = require("../database/models/usersModel");
const db = require("../database/models");
const router = express.Router();

router.post("/signup", Validator.validateSignUp, async (req, res) => {
  try {
    const temp = req.body;
    await db.User.create({
      email: temp.email,
      password: temp.password,
      name: temp.name,
    });
    res.status(200).json({
      status: 200,
      message: "Signup Success",
    });
  } catch (e) {
    res.status(500).json({
      status: 200,
      message: "Signup failed",
      error: e.toString(),
    });
  }
});

module.exports = router;
