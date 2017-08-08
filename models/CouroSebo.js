const mongoose = require("mongoose");

const CouroSebo = mongoose.model("CouroSebo", {
  preco: { type: String, trim: true },
  brasil_central: { type: String, trim: true },
  rs: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { CouroSebo };
