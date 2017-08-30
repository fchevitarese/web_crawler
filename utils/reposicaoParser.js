const _ = require("lodash");
const { parseDate } = require("./parseDate");

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
  });

  let tmpState = "";
  let dados = [];
  let tmpObj = {};
  data("table .conteudo").each(function(i, elem) {
    let item = data(this).text();
    let tmp = splitString(item);
    let items = tmp.map(item => clearString(item));
    items = items.filter(item => item !== "");

    var control = 0;
    var controlHeader = 0;
    var itemCounter = 0;
    tmpObj = {
      tipo: tableData[i][`${i}`],
      data: parseDate(tableData[i][`${i}`]),
      prices: []
    };
    tableData[i].items.forEach(item => {
      tmpObj.prices[item] = [];
    });

    let tmpState = items.shift();
    console.log(i);

    let tmpItems = _.chunk(items, 3);
    let result = [];
    tmpItems.forEach((elem, idx) => {
      elem.unshift(tmpState);
      let tmp = _.zipObject(tableData[i].headers, elem);
      tmpObj.prices[tableData[i].items[idx]].push(tmp);
      // tmpObj[tableData[i].items[idx]].push(_.extend(tmp, tmpObj));
      // result.push(_.extend(tmp, tmpObj));
    });
  });
};

module.exports = {
  reposicaoGetData
};
