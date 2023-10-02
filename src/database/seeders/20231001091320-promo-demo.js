"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("promotions", [
      {
        event_id: 2,
        promo_code: "DISKON1212",
        discount: 10,
        start_date: "2023-10-01T10:00:00+07:00",
        end_date: "2023-10-04T17:00:00+07:00",
        quota: 100,
        active: true,
      },
      {
        event_id: 2,
        promo_code: "DISKONGES",
        discount: 10,
        start_date: "2023-10-03T10:00:00+07:00",
        end_date: "2023-10-04T17:00:00+07:00",
        quota: 100,
        active: true,
      },
      {
        event_id: 2,
        promo_code: "DISKONNIH",
        discount: 10,
        start_date: "2023-09-30T10:00:00+07:00",
        end_date: "2023-10-01T16:00:00+07:00",
        quota: 100,
        active: true,
      },
      {
        event_id: 3,
        promo_code: "DISKONBESAR",
        discount: 10,
        start_date: "2023-10-01T00:00:00+07:00",
        end_date: "2023-10-04T17:00:00+07:00",
        quota: 100,
        active: true,
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("promotions", null, {});
  },
};
