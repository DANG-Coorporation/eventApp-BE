import { DataTypes, Model } from "sequelize";
import Database from "../src/database/db";

class Referrals extends Model {}

Model.init(
  {
    referral_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    transcation_id: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: "transactions",
          schema: "schema",
        },
        key: "transaction_id",
      },
    },
    referral_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "referrals",
    sequelize: new Database().getConnection(),
  }
);

export default Referrals;
