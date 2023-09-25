const express = require("express");

const mainRoute = express.Router();

mainRoute.get("/", (_, res) => {
  res.status(200).send("This is Server!!");
});

mainRoute.all("/*", (_, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

module.exports = mainRoute;
