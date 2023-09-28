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
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Transaction.belongsTo(models.Event, {
        foreignKey: "event_id",
      });
      Transaction.belongsTo(models.Promotion, {
        foreignKey: "promotion_id",
      });
      Transaction.hasMany(models.Referral, {
        foreignKey: "transaction_id",
      });
      Transaction.hasMany(models.Review, {
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
      promotion_id: {
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
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      timestamps: false,
    }
  );
  return Transaction;
};
