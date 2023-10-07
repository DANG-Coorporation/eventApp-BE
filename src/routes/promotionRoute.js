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
router.get("/promotion", PromoController.checkUsedPromo, PromoController.getActivePromo);
router.post("/promotion", PromoController.createPromo);
router.delete("/promotion/:promoId", PromoController.deactivatePromo);

module.exports = router;
