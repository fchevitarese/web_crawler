const mongoose = require("mongoose");

const IndicadoresScot = mongoose.model("IndicadoresScot", {
  indicador: { type: String, trim: true },
  boi: { type: String, trim: true },
  margem: { type: String, trim: true },
  vaca: { type: String, trim: true },
  margem: { type: String, trim: true },
  data: { type: String, trim: true }
});

module.exports = { IndicadoresScot };
