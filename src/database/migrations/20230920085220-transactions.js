"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      promotion_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      buy_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      bill: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      isTransactionCompleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
