"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("promotions", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      event_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      promo_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      discount: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: true,
      },
      quota: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("promotions");
  },
};
