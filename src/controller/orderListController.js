const db = require("../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const getOrderedList = async (req, res) => {
  const { user_id } = req.params;
  const { event_status, transaction_id } = req.query;
  const options = {
    model: db.Event,
    as: 'event',
    where: {},
  };
  const isEventDone =
    event_status == "done"
      ? true
      : event_status == "ordered"
      ? false
      : undefined;
  let transactionClause = {
    user_id: user_id,
  };
  if (req.query.transaction_id) {
    transactionClause.id = req.query.transaction_id;
  }
  if (isEventDone !== undefined) {
    options.where = {
      end_date: isEventDone
        ? { [Op.lte]: Sequelize.literal("NOW()") }
        : { [Op.gt]: Sequelize.literal("NOW()") },
    };
  }
  try {
    const result = await db.Transaction.findAll({
      where: transactionClause,
      include: [
        options,
        {
          model: db.Review,
          as: "review",
        },
        {
          model: db.Referral,
          as: "referral",
        },
        {
          model: db.Promotion,
          as: 'promotion'
        },
      ],
    });
    res.status(200).json({
      status: 200,
      message: "Get order successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Failed get order",
      error: e.toString(),
    });
  }
};

module.exports = {
  getOrderedList,
};
