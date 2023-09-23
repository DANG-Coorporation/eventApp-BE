const { Model, DataTypes } = require("sequelize");
const Database = require("../db");

class Users extends Model {}
Users.init(
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
    tableName: "users",
    sequelize: new Database().getConnection(),
  }
);

module.exports = Users;
