"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("promotions", {
      fields: ["event_id"],
      references: {
        table: "events",
        field: "id",
      },
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("promotions", "event_id");
    await queryInterface.addColumn("promotions", "event_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
};
