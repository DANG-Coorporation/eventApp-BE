"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "naufanrikzaahmada@gmail.com",
        password: "tornado99",
        name: "Naufan Rikza Ahmada",
      },
      {
        email: "lorem@gmail",
        password: "lorem123456789",
        name: "Lorem Ipsum",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
