const { Model, DataTypes } = require("sequelize");
const Database = require("../src/database/db");

class Referrals extends Model {}

Model.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    transaction_id: {
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

// export default Referrals;
module.exports = Referrals;
