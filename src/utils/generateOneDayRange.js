const moment = require("moment/moment");

const generateOneDayRange = (substract = 0) => {
  return [
    moment()
      .subtract(substract, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DD HH:mm:ss"),
    moment()
      .subtract(substract, "days")
      .hour(23)
      .minute(59)
      .second(59)
      .format("YYYY-MM-DD HH:mm:ss"),
  ];
};

module.exports = generateOneDayRange;
