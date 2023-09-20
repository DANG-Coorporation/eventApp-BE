import { Model, DataTypes } from "sequelize";
import Database from "../src/database/db";

class Events extends Model {}
Events.init(
  {
    event_id: {
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
    tableName: "events",
    sequelize: new Database().getConnection(),
  }
);

export default Events;
