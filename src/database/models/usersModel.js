// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");

// class Users extends Model {}
// Users.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "users",
//     sequelize: new Database().getConnection(),
//   }
// );

// module.exports = Users;

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Event, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
