"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("reviews", {
      fields: ["transcation_id"],
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
    await queryInterface.removeColumn("reviews", "transaction_id");
    await queryInterface.addColumn("reviews", "transaction_id", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },
};
