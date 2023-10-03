"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
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
      event_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      event_category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      ticket_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      event_place: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      quota: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      img: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("events");
  },
};
