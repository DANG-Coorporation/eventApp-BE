const moment = require("moment/moment");
const db = require("../database/models");
const normalizeDate = require("../utils/normalizeDate");

class PromoController {
  static async getPromos(req, res, next) {
    console.log(req.query);
    try {
      if (Object.keys(req.query).length > 0) {
        return next();
      }
      const promos = await db.Promotion.findAll({
        raw: true,
      });

      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: promos,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: null,
        data: promos,
      });
    }
  }

  static async getPromoByEvent(req, res, next) {
    try {
      if (req.query.promo_code) {
        return next();
      }
      const { event_id } = req.query;
      const promos = await db.Promotion.findAll({
        raw: true,
        where: {
          event_id: event_id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: promos,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: null,
        data: promos,
      });
    }
  }

  static async getPromoByPromoCode(req, res) {
    try {
      const { promo_code } = req.query;
      const promos = await db.Promotion.findAll({
        raw: true,
        where: {
          promo_code: promo_code,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: promos,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: null,
        data: promos,
      });
    }
  }

  static async checkPromoByEvent(req, res) {
    try {
      const { event_id, promo_code, date_now } = req.query;
      console.log(req.query);

      const promo = await db.Promotion.findOne({
        raw: true,
        where: {
          promo_code: promo_code,
          event_id: event_id,
        },
      });

      const referral = await db.Referral.findOne({
        raw: true,
        where: {
          referral_code: promo_code,
        },
      });

      if (!promo && !referral) {
        return res.status(200).json({
          status: 200,
          message: "Request was successfull",
          error: null,
          data: {
            isValid: false,
            detail: promo,
          },
        });
      }

      if (promo) {
        const endDate = moment(normalizeDate(promo.end_date.toISOString()));
        const startDate = moment(normalizeDate(promo.start_date.toISOString()));
        const currentDate = moment(date_now);

        console.log(startDate);
        console.log(endDate);

        if (
          !promo.active ||
          currentDate.valueOf() < startDate.valueOf() ||
          currentDate.valueOf() > endDate.valueOf()
        ) {
          return res.status(200).json({
            status: 200,
            message: "Request was successfull",
            error: null,
            data: {
              isValid: false,
              detail: promo,
            },
          });
        }
      }

      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: {
          isValid: true,
          detail: promo,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: e.toString(),
        data: null,
      });
    }
  }
}

module.exports = PromoController;
