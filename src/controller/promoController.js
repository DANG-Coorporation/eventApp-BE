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
      console.log(e);
      res.status(500).json({
        status: 500,
        message: "Request failed",
        error: e.toString(),
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
          active: true,
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
        error: e.toString(),
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
        error: e.toString(),
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

      console.log(promo);

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
        const endDate = normalizeDate(promo.end_date);
        const startDate = normalizeDate(promo.start_date);
        const currentDate = moment(date_now);

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
      });
    }
  }
  static async checkUsedPromo(req, res, next) {
    const { event_id } = req.query;
    req.promoUsed = null
    try {
      const promoUsed = await db.Transaction.count({
        where: { event_id: event_id },
        include:
          {
            model: db.Promotion,
            as:'promotion',
            where:{
              active: true
            }
          }
        
      });
      req.promoUsed = promoUsed
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Check Used Promo Failed",
        error: e.toString(),
      });
    }
    if(req.promoUsed !== null){
      next()
    }
  }
  static async getActivePromo(req, res, next) {
    try{
      const result = await db.Promotion.findOne({
        where:{
          event_id: req.query.event_id,
          active: true
        }
      })
      res.status(200).json({
        status: 200,
        message: "Get Active Promotion Successfully",
        data: result ? {
          ...result.dataValues,
          used_promo:req.promoUsed
        } : null
      });
    } catch (e){
      res.status(500).json({
        status: 500,
        message: "Get Active Promotion Failed",
        error: e.toString(),
      });
    }
  }

  static async createPromo(req, res) {
    const { event_id, promo_code, start_date, end_date, discount, quota } =
      req.body;
    try {
      const checkActivePromo = await db.Promotion.findOne({
        where: {
          event_id: event_id,
          active: 1,
        },
      });
      const checkEventDate = await db.Event.findOne({
        raw: true,
        where: {
          id: event_id,
        },
        attributes: ["end_date"],
      });
      const promoDateIsValid = start_date <= end_date;
      const eventDateIsValid =
        new Date(end_date) <= new Date(checkEventDate.end_date);
      if (
        !event_id ||
        !promo_code ||
        !start_date ||
        !end_date ||
        !discount ||
        !quota
      ) {
        return res.status(400).send({
          status: 400,
          message: "Field must be filled",
        });
      }
      if (!promoDateIsValid) {
        return res.status(500).json({
          status: 500,
          message: "Post Promotion failed",
          error:
            "Promo date is invalid, Promo start date must be less than or equal to promo date end",
        });
      }
      if (checkActivePromo) {
        return res.status(500).json({
          status: 500,
          message: "Post Promotion failed",
          error: "Another Promotion is active",
        });
      }
      if (!eventDateIsValid) {
        return res.status(500).json({
          status: 500,
          message: "Post Promotion failed",
          error: "Promo date must be less than or equal to event date end",
        });
      }
      await db.Promotion.create({
        event_id: event_id,
        promo_code: promo_code,
        start_date: start_date,
        end_date: end_date,
        discount: discount,
        quota: quota,
        active: true,
      });
      res.status(200).json({
        status: 200,
        message: "Post Promotion Success",
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Post Promotion failed",
        error: e.toString(),
      });
    }
  }
  static async deactivatePromo(req, res) {
    const paramPromoId = req.params.promoId;
    try {
      await db.Promotion.update(
        { active: false },
        {
          where: {
            id: paramPromoId,
          },
        }
      );
      res.status(200).json({
        status: 200,
        message: "Delete Promotion Success",
      });
    } catch (e) {
      res.status(500).json({
        status: 200,
        message: "Get Promotion Failed",
        error: e.toString(),
      });
    }
  }
}

module.exports = PromoController;
