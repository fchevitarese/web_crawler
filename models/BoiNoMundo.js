const mongoose = require("mongoose");

const BoiNoMundo = mongoose.model("BoiNoMundo", {
  pais: { type: String, trim: true },
  dolar: { type: String, trim: true },
  ha_1_ano: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { BoiNoMundo };
