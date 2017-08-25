const ParseMercadoFuturo = (data, page, date) => {
  let object = { title: page.title, item: page.item, data: date };

  let splitted_arr = data.replace(/(\r\n|\n|\r)/gm, "|").split("|");

  let parsedData = [];
  splitted_arr.map(item => {
    if (item.trim() !== "") {
      parsedData.push(item.replace(/\s/g, ""));
    }
  });

  if (parsedData.length == 7 && parsedData[0] !== "Futuros") {
    parsedData.map((elem, i) => {
      object[[page.header[i]]] = elem.trim();
    });
    return object;
  } else {
    return null;
  }
};

module.exports = ParseMercadoFuturo;
