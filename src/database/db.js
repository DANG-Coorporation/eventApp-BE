import { Sequelize, DataTypes } from "sequelize";
import dotEnv from "dotenv";

dotEnv.config();

class Database {
  #dbName;
  #user;
  #pass;
  #host;
  #port;
  #dbConnection;

  constructor() {
    this.#dbName = process.env.DB_NAME;
    this.#host = process.env.DB_HOST;
    this.#port = process.env.DB_PORT;
    this.#user = process.env.DB_USER;
    this.#pass = process.env.DB_PASS;
    this.#dbConnection = new Sequelize(this.#dbName, this.#user, this.#pass, {
      host: this.#host,
      dialect: "mysql",
    });
  }

  getConnection() {
    return this.#dbConnection;
  }

  #connect() {
    this.#dbConnection
      .authenticate()
      .then(() => {
        console.log("DB connection success");
      })
      .catch((e) => {
        console.log("DB connection failed");
      });
  }
}

export default Database;
