"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      transcation_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },

      star: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
      },

      comment: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: true,
      },

      isEdited: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("reviews");
  },
};
