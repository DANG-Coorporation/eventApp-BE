const express = require("express");

const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.status(200).send("This is Server!!");
});

module.exports = mainRoute;
