const { Sequelize } = require("sequelize");
const dotEnv = require("dotenv");

dotEnv.config();

module.exports = class Database {
  #dbName;
  #user;
  #pass;
  #host;
  #port;
  #dbConnection;

  constructor() {
    this.#dbName = process.env.DB_NAME;
    this.#host =
      process.env.NODE_ENV === "development"
        ? process.env.DB_HOST_DEV
        : process.env.DB_HOST;
    this.#port = process.env.DB_PORT;
    this.#user = process.env.DB_USER;
    this.#pass = process.env.DB_PASS;
    this.#dbConnection = new Sequelize(this.#dbName, this.#user, this.#pass, {
      host: this.#host,
      dialect: "mysql",
      port: this.#port,
      define: {
        timestamps: false,
      },
      dialectOptions: {
        timezone: "+07:00",
        dateStrings: true,
        typeCast: function (field, next) {
          if (field.type === "DATETIME") {
            return field.string();
          }
          return next();
        },
      },
      timezone: "+07:00",
    });
  }

  getConnection() {
    return this.#dbConnection;
  }

  connect() {
    return this.#dbConnection.authenticate();
  }

  sync() {
    this.#dbConnection.sync({
      force: false,
      alter: false,
    });
  }

  getConfig() {
    return {
      dbName: this.#dbName,
      user: this.#user,
      pass: this.#pass,
      host: this.#host,
      port: this.#port,
    };
  }
};
