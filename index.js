const axios = require("axios");
const cheerio = require("cheerio");
const { pages, save } = require("./pages");
const parsePage = require("./parseObject");
const { parseDate } = require("./utils/parseDate");

const getData = page => {
  axios
    .get(page.url)
    .then(response => {
      let $ = cheerio.load(response.data, { decodeEntities: false });

      let texts = [];
      $(".fonte-subtitulo-cinza").each(function(i, elem) {
        texts.push($(this).text());
      });

      let dateInfo = parseDate($("h2").text());

      const data = texts.map(item => {
        return parsePage(item.replace(/(\r\n|\n|\r)/gm, "|"), page, dateInfo);
      });

      if (page.model) {
        save(data, page.model);
      } else {
        console.log(data);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

pages.forEach(page => getData(page));
