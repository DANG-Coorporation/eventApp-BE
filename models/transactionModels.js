import { Model, DataTypes } from "sequelize";
import Database from "../src/database/db";

class Transactions extends Model {}
Transactions.init(
  {
    transaction_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: "users",
          schema: "schema",
        },
        key: "user_id",
      },
    },
    event_id: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: "events",
          schema: "schema",
        },
        key: "event_id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buy_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    sequelize: new Database().getConnection(),
  }
);

export default Transactions;
