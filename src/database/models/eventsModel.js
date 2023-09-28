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
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Event.hasMany(models.Promotion, {
        foreignKey: "event_id",
      });
      Event.hasMany(models.Transaction, {
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
      event_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ticket_type: {
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
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_place: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      quota: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      img: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
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
