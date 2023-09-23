const Users = require("../database/models/usersModel");
const { Op } = require("sequelize");

class Validator {
  static validateLogin = async (req, res) => {
    try {
      console.log(req.body);
      const body = req.body;
      const users = await Users.findAll({
        where: {
          email: body.email,
          password: body.password,
        },
      });

      if (users.length === 0) {
        res.status(401).json({
          code: 401,
          error: "Email is not registered",
        });
      }

      req.userObj = users[0];
      next();
    } catch (e) {
      res.status(500).json({
        code: 500,
        error: e.toString(),
      });
    }
  };
}

module.exports = Validator;
