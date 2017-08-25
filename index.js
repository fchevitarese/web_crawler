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

const getItems = (data, selector) => {
  // Generic function to parse the html with the selector
  let texts = [];

  data(`${selector}`).each(function(i, elem) {
    texts.push(data(this).text());
  });

  return texts;
};

const getData = page => {
  axios
    .get(page.url)
    .then(response => {
      console.log(`Processing ${page.item}...`);

      let $ = cheerio.load(response.data.toString(), { decodeEntities: false });

      let dateInfo = "";
      let texts = getItems($, page.selector);

      dateInfo = parseDate($("h2").text());

      let data = texts.map(item => {
        let result = page.parser(item, page, dateInfo);

        if (page.state_parser) {
          result = resolveState(result);
        }
        return result;
      });

      if (page.model) {
        if (page.filter_null) {
          data = data.filter(item => item !== null);
        }
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
