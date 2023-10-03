const moment = require("moment/moment");

const normalizeDate = (date = "") => {
  return moment(date, "DD-MM-YYYY HH:mm:ss");
};

module.exports = normalizeDate;
