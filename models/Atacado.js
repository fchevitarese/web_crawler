const mongoose = require("mongoose");

const Atacado = mongoose.model("Atacado", {
  preco: { type: String, trim: true },
  boi: { type: String, trim: true },
  vaca: { type: String, trim: true },
  ha_1_ano_boi: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { Atacado };
