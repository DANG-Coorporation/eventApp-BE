"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.DataTypes.BIGINT,
        // references: {
        //   model: {
        //     tableName: "users",
        //   },
        //   key: "user_id",
        // },
        allowNull: true,
      },
      event_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      ticket_type: {
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
      location: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      event_place: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      quota: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      img: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("events");
  },
};
