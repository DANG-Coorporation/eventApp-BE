"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      event_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      promotion_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      qty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      buy_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
