const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
const Database = require("./database/db.js");

const validator = require("./middleware/validator.js");

const mainRoute = require("./routes/mainRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const signUpRoute = require("./routes/signupRoute.js");
const dummyRoute = require("./routes/dummyRoute.js");
const eventRoute = require("./routes/eventRoute.js");

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
    //middleware di sini ges
    this.#server.use(helmet());
    this.#server.use(cors());
    this.#server.use(bodyParser.json());
    this.#server.use(bodyParser.urlencoded({ extended: true }));
    this.#server.use(validator.validateApi);

    //tambahkan semua route di sini ges
    this.use(loginRoute);
    this.use(signUpRoute);
    this.use(eventRoute);

    this.use(mainRoute);
  }

  use(path = "/", router) {
    this.#server.use(path, router);
  }

  use(router) {
    this.#server.use(router);
  }

  start() {
    this.#db
      .connect()
      .then(() => {
        console.log("db connection success");
        this.#server.listen(process.env.PORT, () => {
          console.log("Server is running at", process.env.PORT);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getDBInstance() {
    return this.#db;
  }
}

// export default Server;
module.exports = Server;
