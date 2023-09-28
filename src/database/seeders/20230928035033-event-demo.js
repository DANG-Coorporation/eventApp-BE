"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("events", [
      {
        user_id: "1",
        event_name: "Liburan bersama",
        event_category: "seru-seruan",
        ticket_type: "free",
        start_date: "2023-09-28T13:00:00.000Z",
        end_date: "2023-09-29T13:00:00.000Z",
        location: "Malang, Jawa Timur",
        event_place: "Stadion Gajayana",
        description: "Event buat kamu yang pingin seru seruan",
        price: 0,
        quota: 10000,
        img: "localhost",
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("events", null, {});
  },
};
