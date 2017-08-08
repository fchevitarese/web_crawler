const mongoose = require("mongoose");

const VacaGorda = mongoose.model("VacaGorda", {
  cidade: { type: String, trim: true },
  a_vista: { type: String, trim: true },
  real_30_d: { type: String, trim: true },
  dollar_30d: { type: String, trim: true },
  mf_2: { type: String, trim: true },
  us_7_d: { type: String, trim: true },
  us_30_d: { type: String, trim: true },
  ano: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { VacaGorda };
