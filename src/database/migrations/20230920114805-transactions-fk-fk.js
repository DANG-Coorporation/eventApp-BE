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
      name: "userid_fk_tr",
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
      name: "eventrid_fk_tr",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("transactions", {
      fields: ["promotion_id"],
      references: {
        table: "promotions",
        field: "id",
      },
      name: "promotionid_fk_tr",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("transactions", "userid_fk_tr");
    await queryInterface.removeConstraint("transactions", "eventrid_fk_tr");
    await queryInterface.removeConstraint("transactions", "promotionid_fk_tr");
  },
};
