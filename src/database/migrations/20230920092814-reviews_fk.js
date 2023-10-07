"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("reviews", {
      fields: ["transaction_id"],
      references: {
        table: "transactions",
        field: "id",
      },
      name: "transactionid_fk_rv",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("reviews", "transactionid_fk_rv");
  },
};
