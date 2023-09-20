import { DataTypes, Model } from "sequelize";
import Database from "../src/database/db";

class Reviews extends Model {}

Reviews.init(
  {
    review_id: {
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

    star: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },

    comment: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    tableName: "reviews",
    sequelize: new Database().getConnection(),
  }
);

export default Reviews;
