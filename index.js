const axios = require("axios");
const cheerio = require("cheerio");
const pages = require("./pages");
const parseData = require("./parseObject");

// "https://www.scotconsultoria.com.br/cotacoes/reposicao/?ref=smn" ->> Very different

const getData2 = page => {
  axios
    .get(page.url)
    .then(response => {
      let $ = cheerio.load(response.data, { decodeEntities: false });

      let texts = [];
      $(".fonte-subtitulo-cinza").each(function(i, elem) {
        texts.push($(this).text());
      });

      const data = texts.map(item => {
        return parseData(item.replace(/(\r\n|\n|\r)/gm, "|"), page);
      });

      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

pages.forEach(page => getData2(page));
