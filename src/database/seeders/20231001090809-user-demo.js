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
        email: "lorem@gmail.com",
        password: "lorem123456789",
        name: "Lorem Ipsum",
      },
      {
        email: "juan@lorem.id",
        password: "juan123456789",
        name: "Juan Lorem",
      },
      {
        email: "setya@gmail.id",
        password: "setyabudinamaku99",
        name: "Setya Budi",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
