"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("promotions", [
      {
        event_id: "1",
        promo_code: "19d30208-5db6-11ee-8c99-0242ac120002",
        start_date: "2023-09-28T13:00:00.000Z",
        end_date: "2023-09-29T13:00:00.000Z",
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
