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
      name: "eventid_fk_pr",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("promotions", "eventid_fk_pr");
  },
};
