"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },

      transcation_id: {
        type: Sequelize.DataTypes.BIGINT,
        // references: {
        //   model: "Transaction",
        //   key: "transaction_id",
        // },
        allowNull: true,
      },

      star: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: true,
      },

      comment: {
        type: Sequelize.DataTypes.TEXT("long"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("reviews");
  },
};
