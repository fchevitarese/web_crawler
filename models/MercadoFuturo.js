const mongoose = require("mongoose");

const MercadoFuturo = mongoose.model("MercadoFuturo", {
  futuros: { type: String, trim: true },
  data_inicio: { type: String, trim: true },
  data_fim: { type: String, trim: true },
  c_abertos: { type: String, trim: true },
  variacao_cambio: { type: String, trim: true },
  cambio: { type: String, trim: true },
  us_a_vista: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { MercadoFuturo };
