"use strict";
const { Model } = require("sequelize");
const moment = require("moment/moment");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: "user_id",
        as : "user"
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
      event_category: {
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
