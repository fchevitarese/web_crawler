const mongoose = require("mongoose");

const Leite = mongoose.model("Leite", {
  uf: { type: String, trim: true },
  regiao: { type: String, trim: true },
  qualidade_minimo: { type: String, trim: true },
  qualidade_maximo: { type: String, trim: true },
  padrao_minimo: { type: String, trim: true },
  padrao_maximo: { type: String, trim: true },
  media_qualidade_reais_litro: { type: String, trim: true },
  media_qualidade_us_litro: { type: String, trim: true },
  media_padrao_reais_litro: { type: String, trim: true },
  media_padrao_us_litr: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { Leite };
