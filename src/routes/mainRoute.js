const express = require("express");
const Users = require("../../models/usersModel");
const Events = require("../../models/eventsModel");
const Promotions = require("../../models/promotions");
const Referrals = require("../../models/referralsModel");
const { Transaction } = require("sequelize");
const Transactions = require("../../models/transactionModels");
const Reviews = require("../../models/reviewsModel");

const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.status(200).send("This is Server!!");
});

mainRoute.get("/insert", async (req, res) => {
  try {
    // await Users.create({
    //   email: "riverdead_49@yahoo.com",
    //   password: "tornado99",
    //   name: "yusri ariandi",
    // });

    // await Events.create({
    //   user_id: 1,
    //   event_name: "gebyar hari raya",
    //   ticket_type: "free",
    //   start_date: "2023-08-09 10:00",
    //   end_date: "2023-08-013 10:00",
    //   location: "Malang, Jawa Timur",
    //   event_place: "Stadion Gajayana",
    //   description: "Masuk nih ye",
    //   price: 0,
    //   quota: 150,
    //   img: "gambar",
    // });

    // await Promotions.create({
    //   event_id: 1,
    //   promo_code: "JVXYZH",
    //   start_date: "2023-08-09 10:00:00",
    //   end_date: "2023-08-13 10:00:00",
    //   discount : 20,
    //   quota : 30,
    //   active : true,
    // });
    // console.log(user);

    // await Referrals.create({
    //   transaction_id: 1,
    //   referral_code: "qwertyu",
    // });

    await Reviews.create({
      transcation_id: 1,
      star: 3,
      comment: "ini keren banget sih",
    });

    res.status(200).send("write success");
  } catch (e) {
    console.log(e);
    res.status(500).send("failed to write");
  }
});

module.exports = mainRoute;
