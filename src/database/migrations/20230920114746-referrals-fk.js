"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("referrals", {
      fields: ["transaction_id"],
      references: {
        table: "transactions",
        field: "id",
      },
      name: "transactionid_fk_rf",
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("referrals", "transactionid_fk_rf");
  },
};
