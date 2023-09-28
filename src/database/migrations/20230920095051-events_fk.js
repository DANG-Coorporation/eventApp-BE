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
      name: "userid_fk_evt",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("events", "userid_userid_fk_evtfk");
  },
};
