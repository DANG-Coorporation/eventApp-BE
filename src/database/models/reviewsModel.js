"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
    }
  }
  Review.init(
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

      star: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },

      isEdited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      timestamps: false,
    }
  );
  return Review;
};
