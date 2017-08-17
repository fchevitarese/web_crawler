const axios = require("axios");
const cheerio = require("cheerio");
const { pages, save } = require("./pages");
const { parseDate } = require("./utils/parseDate");

let last_state = "";

const resolveState = object => {
  if (last_state === "") {
    last_state = object.uf;
  }

  if (object.uf == "-") {
    object.uf = last_state;
  }

  if (last_state !== object.uf && object.uf !== "-") {
    last_state = object.uf;
  }
  return object;
};

const getData = page => {
  axios
    .get(page.url)
    .then(response => {
      console.log(`Processing ${page.item}...`);

      let $ = cheerio.load(response.data, { decodeEntities: false });
      let texts = [];

      let dateInfo = "";
      $(".fonte-subtitulo-cinza").each(function(i, elem) {
        texts.push($(this).text());
      });
      dateInfo = parseDate($("h2").text());

      const data = texts.map(item => {
        let result = page.parser(
          item.replace(/(\r\n|\n|\r)/gm, "|"),
          page,
          dateInfo
        );

        if (page.state_parser) {
          result = resolveState(result);
        }
        return result;
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
