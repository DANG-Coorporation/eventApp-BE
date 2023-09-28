// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");

// class Referrals extends Model {
//   static associate(models) {
//     Referrals.hasOne(models.Transaction, {
//       foreignKey: "transaction_id",
//     });
//     models.Transaction.belongsTo(Referrals);
//   }
// }

// Model.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
//     },
//     transaction_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: {
//           tableName: "transactions",
//           schema: "schema",
//         },
//         key: "transaction_id",
//       },
//     },
//     referral_code: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "referrals",
//     sequelize: new Database().getConnection(),
//   }
// );

// module.exports = Referrals;

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    static associate(models) {
      Referral.belongsTo(models.Transaction, {
        foreignKey : "transaction_id"
      });
    }
  }
  Referral.init(
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
      sequelize,
      modelName: "Referral",
      tableName: "referrals",
      timestamps: false,
    }
  );
  return Referral;
};
