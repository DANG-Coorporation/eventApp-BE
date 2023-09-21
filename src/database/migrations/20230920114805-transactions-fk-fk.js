"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("transactions", {
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("transactions", {
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
    await queryInterface.removeColumn("transactions", "user_id");
    await queryInterface.removeColumn("transactions", "event_id");
    await queryInterface.addColumn("transactions", "user_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
    await queryInterface.addColumn("transactions", "event_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
};
