// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");

// class Reviews extends Model {
//   static associate(models) {
//     Reviews.hasMany(models.Transaction, {
//       foreignKey: "transcation_id",
//     });
//     models.Transaction.belongsTo(Reviews);
//   }
// }

// Reviews.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
//     },

//     transcation_id: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: {
//           tableName: "transactions",
//           schema: "schema",
//         },
//         key: "transaction_id",
//       },
//     },

//     star: {
//       type: DataTypes.SMALLINT,
//       allowNull: true,
//     },

//     comment: {
//       type: DataTypes.TEXT("long"),
//     },
//   },
//   {
//     tableName: "reviews",
//     sequelize: new Database().getConnection(),
//   }
// );

// module.exports = Reviews

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
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

      is_edited: {
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
