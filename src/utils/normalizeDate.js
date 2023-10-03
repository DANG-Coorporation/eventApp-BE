const normalizeDate = (date = "") => {
  const temp = date.split(".");
  return temp[0] + "+07:00";
};

module.exports = normalizeDate;
