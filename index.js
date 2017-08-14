const axios = require("axios");
const cheerio = require("cheerio");
const tbParser = require("cheerio-tableparser");
const { pages, save } = require("./pages");
const { parseDate } = require("./utils/parseDate");
const _ = require("lodash");

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
      let tables = [];
      let types = [];

      let dateInfo = "";
      if (page.item !== "reposicoes") {
        $(".fonte-subtitulo-cinza").each(function(i, elem) {
          texts.push($(this).text());
        });
        dateInfo = parseDate($("h2").text());
      } else {
        tbParser($); //tableparser

        let dataTable = $("table").parsetable();
        let last_header = "";
        let indexer = 0;
        var obj = {};

        dataTable[0].forEach((item, counter) => {
          if (
            item !== "SC*" &&
            item !== "RS* **" &&
            !item.startsWith("*SC") &&
            item.length > 2
          ) {
            obj[item] = { indexer };
            last_header = item;
            indexer += 1;
          } else if (
            item !== "" &&
            item !== "UF" &&
            item !== "\n\t" &&
            !item.startsWith("*SC")
          ) {
            if (!("item_headers" in obj[last_header])) {
              obj[last_header]["item_headers"] = ["tipo", "cotacao"];
            }
            obj[last_header].item_headers.push(item);
          }
        });

        delete dataTable[0]; // remove headers.

        let parsedObjects = [];
        let last_processed = "";
        let last_type = "";
        let controller = 0;
        let ctrl = 0;
        dataTable.forEach(item => {
          let clean = item.filter(clear => {
            clear = clear.replace(/[\t\r]+/g, "");
            return clear.trim() != "";
          });

          let tmp_cotacao = "";
          let last_header = "";
          clean.map((item, i) => {
            let indexer = _.findKey(obj, o => o.indexer === controller);
            let field_length = obj[indexer].item_headers.length;

            if (!last_processed) {
              last_processed = obj[indexer];
              ctrl = 0;
              item = item
                .replace(/\s+/g, " ")
                .replace(/[\t\n]+/g, "")
                .replace("<br>", "")
                .trim();
              last_processed[item] = [];
              last_header = item;
            }

            if (ctrl < field_length) {
              if (ctrl === 1) {
                tmp_cotacao = item;
                obj[indexer][last_header][tmp_cotacao] = [];
              } else if (ctrl > 1) {
                obj[indexer][last_header][tmp_cotacao].push({
                  [obj[indexer].item_headers[ctrl]]: parseFloat(item)
                });
              }
              console.log(`${obj[indexer].item_headers[ctrl]}: ${item}`);
              ctrl += 1;
            }

            if (ctrl == field_length) {
              last_processed = "";
              controller += 1;
            }

            if (controller >= 4) {
              controller = 0;
              last_processed = "";
            }
          });
        });
      }

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
