const parseData = (data, page, date) => {
  // Parse the data, removing the empty elements and generating the objects.
  // TODO: Check if length of array is the same as header to save item.
  let object = { title: page.title, item: page.item, data: date };
  data = data.replace(/(\r\n|\n|\r)/gm, "|");

  let tmp = data.split("|").filter(elem => {
    return elem.trim() !== "";
  });

  if (page.state_parser && tmp.length !== page.header.length) {
    tmp.unshift("-");
  }

  tmp.map((elem, i) => {
    object[[page.header[i]]] = elem.trim();
  });

  return object;
};

module.exports = parseData;
