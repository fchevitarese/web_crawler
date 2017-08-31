const mongoose = require("mongoose");

const Reposicao = mongoose.model("Reposicao", {
  raca: { type: String, trim: true },
  data: { type: String, trim: true },
  cotacoes: []
});

module.exports = { Reposicao };
