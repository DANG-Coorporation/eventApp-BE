import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import dotEnv from "dotenv";

import mainRoute from "./routes/mainRoute.js";
import Database from "./database/db.js";

class Server {
  #server = undefined;
  #db = undefined;
  constructor() {
    this.#server = express();
    this.#db = new Database();
    this.#middlewareSetUp();
    dotEnv.config();
  }

  #middlewareSetUp() {
    this.#server.use(helmet());
    this.#server.use(cors());
    this.#server.use(bodyParser.json());
    this.#server.use(bodyParser.urlencoded({ extended: true }));

    this.use(mainRoute);
  }

  use(path = "/", router) {
    this.#server.use(path, router);
  }

  use(router) {
    this.#server.use(router);
  }

  start() {
    this.#server.listen(process.env.PORT, () => {
      console.log("Server is running at", process.env.PORT);
    });
  }

  getDBInstance() {
    return this.#db;
  }
}

export default Server;
