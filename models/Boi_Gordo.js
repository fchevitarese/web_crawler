const mongoose = require("mongoose");

const BoiGordo = mongoose.model("BoiGordo", {
  cidade: { type: String, trim: true },
  a_vista: { type: String, trim: true },
  real_30_d: { type: String, trim: true },
  dollar_30d: { type: String, trim: true },
  base1: { type: String, trim: true },
  us_7_d: { type: String, trim: true },
  us_30_d: { type: String, trim: true },
  ano: { type: String, trim: true }
});

module.exports = { BoiGordo };
