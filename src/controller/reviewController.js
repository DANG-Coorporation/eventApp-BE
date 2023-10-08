const db = require("../database/models");

const createReview = async (req, res) => {
  const { transaction_id, star, comment } = req.body;
  try {
    const resCheckEvent = await db.Transaction.findOne({
      where: {
        id: transaction_id,
      },
      include: {
        model: db.Event,
        as: "event",
        attributes: ["start_date", "end_date"],
      },
      attributes: ["id", "event_id"],
    });
    const resCheckReview = await db.Review.findOne({
      where: {
        transaction_id: transaction_id,
      },
    });
    if (new Date() < resCheckEvent.event.end_date) {
      return res.status(400).json({
        status: 400,
        message: "Event is not finished yet",
        error: e.toString(),
      });
    }
    if (!transaction_id || !star) {
      return res.status(400).send({
        status: 400,
        message: "Transaction_id and star must filled",
      });
    }
    if (resCheckReview) {
      return res.status(400).send({
        status: 400,
        message: "The Event has been reviewed",
      });
    }
    await db.Review.create({
      transaction_id: transaction_id,
      star: star,
      comment: comment,
      isEdited: false,
    });
    res.status(200).json({
      status: 200,
      message: "Post Review Success",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Post Review failed",
      error: e.toString(),
    });
  }
};

const getReview = async (req, res) => {
  const { transaction_id } = req.query;
  try {
    const result = await db.Review.findOne({
      where: {
        transaction_id: transaction_id,
      },
      include: {
        model: db.Transaction,
        as: "transaction",
        attributes: [],
        // include: {
        //   model: db.Event,
        //   attributes: ["id"],
        // },
      },
    });
    res.status(200).json({
      status: 200,
      message: "Get Review Success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Get Review Failed",
      error: e.toString(),
    });
  }
};

const editReview = async (req, res) => {
  try {
    const { transaction_id, star, comment } = req.body;
    const [result] = await db.Review.update(
      {
        star: star,
        comment: comment,
        isEdited: true,
      },
      {
        where: {
          transaction_id: transaction_id,
          isEdited: false,
        },
      }
    );
    if (result > 0) {
      return res.status(200).json({
        status: 200,
        message: "Update Review Success",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "User only can update review once",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Update Review Failed",
      error: e.toString(),
    });
  }
};

module.exports = {
  createReview,
  getReview,
  editReview,
};
