"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    static associate(models) {
      Referral.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
    }
  }
  Referral.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        allowNull: false,
      },
      referral_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Referral",
      tableName: "referrals",
      timestamps: false,
    }
  );
  return Referral;
};
