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
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("referrals", "transaction_id");
    await queryInterface.addColumn("referrals", "transaction_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
};
