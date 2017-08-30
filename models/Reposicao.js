const mongoose = require("mongoose");

const Reposicao = mongoose.model("Reposicao", {
  tipo: { type: String, trim: true },
  prices: [],
  data: { type: String, trim: true }
});

module.exports = { Reposicao };
