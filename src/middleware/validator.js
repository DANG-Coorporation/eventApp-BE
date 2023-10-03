// const Users = require("../database/models/usersModel");
const jwt = require("jsonwebtoken");
const db = require("../database/models");

class Validator {
  static async validateApi(req, res, next) {
    try {
      const whitelist = ["/", "/login", "/signup"];
      for (let path of whitelist) {
        if (req.path === path) {
          return next();
        }
      }

      const headers = req.headers;
      if (headers.authorization === undefined) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized request",
          error: "Invalid token",
        });
        return;
      }

      const token = headers.authorization.split(" ");
      const user = jwt.verify(token[1], process.env.JWT_TOKEN);

      if (!user) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized request",
          error: "Invalid token",
        });
        return;
      }

      const userdb = await db.User.findOne({
        where: {
          email: user.email,
          password: user.password,
        },
      });

      if (!userdb) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized request",
          error: "Invalid token",
        });
        return;
      }

      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        res.status(500).json({
          code: 401,
          message: "Unauthorized request",
          error: "Invalid token",
        });
      } else {
        res.status(500).json({
          code: 500,
          message: "Server error",
          error: e.toString(),
        });
      }
    }
  }

  static async validateLogin(req, res, next) {
    try {
      const body = req.body;
      const users = await db.User.findOne({
        where: {
          email: body.email,
          password: body.password,
        },
      });

      if (!users) {
        res.status(401).json({
          code: 401,
          message: "Login failed",
          error: "Email or Password is not valid",
        });
        return;
      }
      req.userObj = users.dataValues;
      next();
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Login failed",
        error: e.toString(),
      });
    }
  }

  static async validateSignUp(req, res, next) {
    try {
      const body = req.body;
      const users = await db.User.findOne({
        where: {
          email: body.email,
        },
      });

      if (users) {
        res.status(401).json({
          code: 401,
          message: "Signup failed",
          error: "Email is registered",
        });
        return;
      }

      req.userObj = body;
      next();
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "Login failed",
        error: e.toString(),
      });
    }
  }
}

module.exports = Validator;
