const mongoose = require("mongoose");

const Milho = mongoose.model("Milho", {
  uf: { type: String, trim: true },
  cidade: { type: String, trim: true },
  compra: { type: String, trim: true },
  venda: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { Milho };
