const { Model, DataTypes } = require("sequelize");
const  Database  = require("../src/database/db");

class Reviews extends Model {
  static associate(models) {
    Reviews.hasMany(models.Transaction, {
      foreignKey: "transcation_id",
    });
    models.Transaction.belongsTo(Reviews);
  }
}

Reviews.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },

    transcation_id: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: "transactions",
          schema: "schema",
        },
        key: "transaction_id",
      },
    },

    star: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },

    comment: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    tableName: "reviews",
    sequelize: new Database().getConnection(),
  }
);

module.exports = Reviews
