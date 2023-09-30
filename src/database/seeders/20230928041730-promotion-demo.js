"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("promotions", [
      {
        event_id: "4",
        promo_code: "KVUUFB3W",
        start_date: "2023-10-5T13:00:00.000Z",
        end_date: "2023-10-6T13:00:00.000Z",
        discount: 30,
        quota: 10000,
        active: true,
      },
      {
        event_id: "5",
        promo_code: "YP305T4A",
        start_date: "2023-10-5T13:00:00.000Z",
        end_date: "2023-10-6T13:00:00.000Z",
        discount: 30,
        quota: 10000,
        active: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("promotions", null, {});
  },
};
