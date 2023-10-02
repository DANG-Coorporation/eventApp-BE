"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("events", [
      {
        user_id: "1",
        event_name: "GOAL KAMPUNG",
        event_category: "sport",
        ticket_type: "not free",
        start_date: "2023-11-02T10:00:00.000Z",
        end_date: "2023-11-02T17:00:00.000Z",
        location: "DKI Jakarta",
        event_place: "Mahaka Square",
        description:
          "THR mempersembahkan Charity Match futsal pertama di Indonesia bernama Goal Kampung yang dihadiri oleh Sean Garnier dan Edgar Davids dan akan di dukung oleh pengisi acara Pee Wee Gaskin, M.A.C, Aan Story & Mitha lestari, dan masih banyak lagi",
        price: 100000,
        quota: 10000,
        img: "localhost",
      },
      {
        user_id: "2",
        event_name: "[TIM] MLBB SULTAN CUP RISING STAR",
        event_category: "e-sport",
        ticket_type: "not free",
        start_date: "2023-10-07T00:00:00.000Z",
        end_date: "2023-11-26T00:00:00.000Z",
        location: "Banten",
        event_place: "Phantom",
        description: `Sebuah kolaborasi epik antara Ex-Pro Player juga Penyanyi Berbakat Brisia Jodie, dan Sultan Rudy Salim dengan promotor Prestige Promotions untuk mencari bakat-bakat muda yang bisa berprestasi dalam olahraga esports.
          Mobile Legends: Bang Bang Sultan Cup Rising Star merupakan kompetisi bagi para pemain di seluruh Indonesia untuk bersaing, berbagi pengalaman, dan menunjukkan keahlian dalam dunia Mobile Legends yang seru. Hanya disini, pertarungan dan kolaborasi yang paling epik akan terjadi untuk menguji kecerdasan dalam strategi di tengah kompetisi 
          Kompetisi ini diadakan secara ONLINE, untuk mencari 4 terbaik yang akan dipertemukan secara OFFLINE di Jakarta.`,
        price: 164000,
        quota: 50000,
        img: "localhost",
      },
      {
        user_id: "2",
        event_name: `MANDIRIFEST 2023 vol.2 "NGEDEM ATI" mempersembahkan HAPPY ASMARA dan MR. JONO JONI`,
        event_category: "music",
        ticket_type: "not free",
        start_date: "2023-09-28T19:00:00.000Z",
        end_date: "2023-09-28T22:00:00.000Z",
        location: "Jawa Timur",
        event_place: "Ngopibareng Pintu Langit",
        description: `MANDIRIFEST 2023 vol.2 "NGEDEM ATI" mempersembahkan HAPPY ASMARA dan MR. JONO JONI, bertempat di Ngopibareng Pintulangit.`,
        price: 75000,
        quota: 10000,
        img: "localhost",
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete("events", null, {});
  },
};
