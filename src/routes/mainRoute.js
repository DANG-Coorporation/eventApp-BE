import express from "express";

const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.status(200).send("This is Server!!");
});

export default mainRoute;
