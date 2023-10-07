"use strict";
const { Model } = require("sequelize");
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Transaction.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "event",
      });
      Transaction.belongsTo(models.Promotion, {
        foreignKey: "promotion_id",
        as: "promotion",
      });
      Transaction.hasMany(models.Referral, {
        as: "referral",
        foreignKey: "transaction_id",
      });
      Transaction.hasMany(models.Review, {
        as: "review",
        foreignKey: "transaction_id",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        allowNull: false,
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
        allowNull: false,
      },
      promotion_id: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: "events",
            schema: "schema",
          },
          key: "event_id",
        },
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buy_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get: function () {
          return moment(this.getDataValue("buy_date")).format(
            "DD-MM-YYYY HH:mm:ss"
          );
        },
      },
      bill: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      isTransactionCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      timestamps: false,
    }
  );
  return Transaction;
};
