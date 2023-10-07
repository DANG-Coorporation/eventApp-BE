const express = require("express");
const PromoController = require("../controller/promoController");
const router = express.Router();

router
  .get(
    "/promotions",
    PromoController.getPromos,
    PromoController.getPromoByEvent,
    PromoController.getPromoByPromoCode
  )
  .get("/promotion-validation", PromoController.checkPromoByEvent);

module.exports = router;
