const { Model, DataTypes } = require("sequelize");
const Database = require("../db");

class Promotions extends Model {
  static associate(models) {
    Promotions.hasMany(models.Events, {
      foreignKey: "event_id",
    });
    models.Events.belongsTo(Promotions);
  }
}

Promotions.init(
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
    tableName: "promotions",
    sequelize: new Database().getConnection(),
  }
);

Promotions.hasMany();

module.exports = Promotions;
