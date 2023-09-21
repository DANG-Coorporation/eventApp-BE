"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("events", {
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("events", "user_id");
    await queryInterface.addColumn("events", "user_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
};
