const mongoose = require("mongoose");

// Models
const { BoiGordo } = require("./models/BoiGordo");
const { VacaGorda } = require("./models/VacaGorda");
const { CouroSebo } = require("./models/CouroSebo");
const { MercadoFuturo } = require("./models/MercadoFuturo");
const { BoiNoMundo } = require("./models/BoiNoMundo");
const { Atacado } = require("./models/Atacado");
const { IndicadoresScot } = require("./models/IndicadoresScot");
const { Leite } = require("./models/Leite");
const { Soja } = require("./models/Soja");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://dbadmin:1qazse4r5@ds151279.mlab.com:51279/cotacoes_crawler"
);

const save = (data, model) => {
  model.insertMany(data, function(err, result) {
    if (err) return err;
    return result;
  });
};

const pages = [
  {
    item: "boi",
    url: "https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smn",
    title: "Cotações Boi Gordo",
    header: [
      "cidade",
      "a_vista",
      "real_30_d",
      "dollar_30d",
      "base1",
      "us_7_d",
      "us_30_d",
      "ano",
      "data"
    ],
    model: BoiGordo
  },
  {
    item: "vaca",
    url: "https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smn",
    title: "Cotações Vaca Gorda",
    header: [
      "cidade",
      "à_vista",
      "real_30_d",
      "dolar30_d",
      "mf_2",
      "us_7d",
      "us_30d",
      "ano",
      "data"
    ],
    model: VacaGorda
  },
  {
    item: "couro_sebo",
    url: "https://www.scotconsultoria.com.br/cotacoes/couro-e-sebo/?ref=smn",
    title: "Cotações - Couro e Sebo",
    header: ["preco", "brasil_central", "rs", "data"],
    model: CouroSebo
  },
  {
    item: "mercado_futuro",
    url: "https://www.scotconsultoria.com.br/cotacoes/mercado-futuro/?ref=smn",
    title: "Cotações - Mercado futuro",
    header: [
      "futuros",
      "_2_ago",
      "_3_ago",
      "c_abertos",
      "variacao_cambio",
      "us_a_vista",
      "data"
    ],
    model: MercadoFuturo
  },
  {
    item: "boi_no_mundo",
    url: "https://www.scotconsultoria.com.br/cotacoes/boi-no-mundo/?ref=smn",
    title: "Cotações - Boi no mundo",
    header: ["pais", "dolar", "ha_1_ano", "data"],
    model: BoiNoMundo
  },
  {
    item: "atacado",
    url: "https://www.scotconsultoria.com.br/cotacoes/atacado/?ref=smn",
    title: "Cotações - Atacado",
    header: ["preco", "boi", "vaca", "ha_1_ano_boi", "data"],
    model: Atacado
  },
  {
    item: "indicadores",
    url: "https://www.scotconsultoria.com.br/cotacoes/indicadores/?ref=smn",
    title: "Cotações - Indicadores",
    header: ["indicador", "boi", "margem", "vaca", "margem", "data"],
    model: IndicadoresScot
  },
  {
    item: "leite",
    url: "https://www.scotconsultoria.com.br/cotacoes/leite-cotacoes/?ref=smn",
    title: "Cotações - Leite",
    header: [
      "uf",
      "regiao",
      "qualidade_minimo",
      "qualidade_maximo",
      "padrao_minimo",
      "padrao_maximo",
      "media_qualidade_reais_litro",
      "media_qualidade_us_litro",
      "media_padrao_reais_litro",
      "media_padrao_us_litro",
      "data"
    ],
    model: Leite
  },
  {
    item: "soja",
    url: "https://www.scotconsultoria.com.br/cotacoes/soja/?ref=smn",
    title: "Cotações - Soja",
    header: ["uf", "cidade", "compra", "venda", "data"],
    model: Soja
  },
  {
    item: "milho",
    url: "https://www.scotconsultoria.com.br/cotacoes/milho/?ref=smn",
    title: "Cotações - Milho",
    header: ["uf", "cidade", "compra", "venda", "data"],
    model: Milho
  }
];

module.exports = { pages, save };
