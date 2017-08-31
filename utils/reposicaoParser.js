const _ = require("lodash");
const tbParser = require("cheerio-tableparser");
const { parseDate } = require("./parseDate");
const { Reposicao } = require("../models/Reposicao");

const clearString = txt => txt.replace(/[\n\t\r]/g, "").trim();
const splitString = txt => txt.replace(/(\r\n|\n|\r)/gm, "|").split("|");

const clearHeader = txt => {
  txt = txt.split(")");
  let tmp = txt.map(item => {
    item = item.replace("(", "- ");
    return clearString(item);
  });
  tmp = tmp.filter(item => item !== "");
  return tmp;
};

const reposicaoGetData = data => {
  const tableData = [];
  const tableInfo = [];
  const contents = [];
  let dateInfo = "";

  data("table thead").each(function(i, elem) {
    let item = data(this).text();
    let tableObject = {};
    tableObject[`${i}`] = clearString(item);
    tableObject["items"] = [];
    tableData.push(tableObject);
  });

  data(".top").each(function(i, elem) {
    let item = data(this).text();
    tableData[i].items = clearHeader(item);
    tableData[i].headers = ["UF", "R$/cab", "R$/@", "Troca"];
    tableData[i].prices = [];
    tableData[i].content = [];
  });

  // Get all table data.
  data("table").each(function(c, elem) {
    let txtData = data(elem)
      .find("tbody .conteudo")
      .text();
    let tmp = splitString(txtData);
    let items = tmp.map(item => clearString(item));
    items = items.filter(item => item != "");

    let it = _.chunk(items, 13);
    let tmpState = "";
    it.forEach((elem, count) => {
      tmpState = elem.shift();

      let tmp = _.chunk(elem, 3);
      dateInfo = parseDate(tableData[c][`${c}`].split("-")[1]);
      let tmpObj = {
        raca: tableData[c][`${c}`].split("-")[0].trim(),
        data: dateInfo,
        cotacoes: []
      };

      tmp.forEach((elem, i) => {
        elem.unshift(tmpState);
        let item = _.zipObject(tableData[c].headers, elem);
        item["tipo"] = tableData[c].items[i];
        tmpObj.cotacoes.push(item);
      });
      contents.push(tmpObj);
    });
  });

  // Save data.
  today_data = Reposicao.find({ data: dateInfo })
    .remove()
    .exec((err, data) => {
      if (err) console.log(err);
    });

  Reposicao.insertMany(contents, function(err, docs) {
    if (err) return err;
    return docs;
  });
};

module.exports = {
  reposicaoGetData
};
