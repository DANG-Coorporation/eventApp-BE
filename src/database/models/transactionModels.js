// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");

// class Transactions extends Model {
//   static associate(models) {
//     Transactions.hasMany(models.Users, {
//       foreignKey: "user_id",
//     });
//     models.Users.belongsTo(Transactions);

//     Transactions.hasMany(models.Events, {
//       foreignKey: "event_id",
//     });
//     models.Events.belongsTo(Transactions);
//   }
// }
// Transactions.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
//     },
//     user_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: {
//           tableName: "users",
//           schema: "schema",
//         },
//         key: "user_id",
//       },
//     },
//     event_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: {
//           tableName: "events",
//           schema: "schema",
//         },
//         key: "event_id",
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     qty: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     buy_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "transactions",
//     sequelize: new Database().getConnection(),
//   }
// );

// module.exports = Transactions;

"use strict";
const { Model } = require("sequelize");
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
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
