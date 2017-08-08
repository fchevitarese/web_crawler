const moment = require("moment");

const parseDate = str => {
  let m = str.match(/\d{2}(\D)\d{2}\1\d{4}/g);
  if (m) {
    return moment(m[0], "DD/MM/YYYY").format();
  } else {
    return "";
  }
};

module.exports = { parseDate };
