"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("referrals", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      transaction_id: {
        type: Sequelize.DataTypes.BIGINT,
        // references: {
        //   model: {
        //     tableName: "transactions",
        //   },
        //   key: "transaction_id",
        // },
        allowNull: true,
      },
      referral_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("referrals");
  },
};
