// const { Model, DataTypes } = require("sequelize");
// const Database = require("../db");
// const Users = require("./usersModel");

// class Events extends Model {
//   static associate(models) {
//     Events.hasMany(models.Users, {
//       foreignKey: "user_id",
//     });
//     models.Users.belongsTo(Events);
//   }
// }

// Events.Promotions = Events.belongsTo(Promotions);

// Events.init(
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
//     event_name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     ticket_type: {
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
//     location: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     event_place: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//     },
//     quota: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//     },
//     img: {
//       type: DataTypes.TEXT("long"),
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "events",
//     sequelize: new Database().getConnection(),
//   }
// );

// module.exports = Events;

"use strict";
const { Model } = require("sequelize");
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Event.hasMany(models.Promotion, {
        as: "promotion",
        foreignKey: "event_id",
      });
      Event.hasMany(models.Transaction, {
        as: "transaction",
        foreignKey: "event_id",
      });
    }
  }
  Event.init(
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
      },
      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticket_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get: function () {
          return moment(this.getDataValue("start_date")).format(
            "DD-MM-YYYY HH:mm:ss"
          );
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get: function () {
          return moment(this.getDataValue("end_date")).format(
            "DD-MM-YYYY HH:mm:ss"
          );
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quota: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: false,
    }
  );
  return Event;
};
