// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");
// const Events = require("./eventsModel");

// class Promotions extends Model {}

// Promotions.Events = Promotions.hasMany(this.Events, {
//   foreignKey: "event_id",
// });

// Promotions.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
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
//     promo_code: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     discount: {
//       type: DataTypes.SMALLINT,
//       allowNull: true,
//     },
//     quota: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     active: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "promotions",
//     sequelize: new Database().getConnection(),
//   }
// );

// // Promotions.Events = Promotions.

// module.exports = Promotions;

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate(models) {
      Promotion.belongsTo(models.Event, {
        foreignKey: "event_Id",
      });
      Promotion.hasMany(models.Transaction, {
        foreignKey: "promotion_id",
      });
    }
  }
  Promotion.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
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
      promo_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      discount: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      quota: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Promotion",
      tableName: "promotions",
      timestamps: false,
    }
  );
  return Promotion;
};
