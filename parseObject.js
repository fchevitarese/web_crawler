const parseData = (data, page, date) => {
  // Parse the data, removing the empty elements and generating the objects.
  // TODO: Check if length of array is the same as header to save item.
  let object = { title: page.title, item: page.item, data: date };

  let tmp = data.split("|").filter(elem => {
    return elem.trim() !== "";
  });

  let last_header = "";
  tmp.map((elem, i) => {
    object[[page.header[i]]] = elem.trim();
  });

  return object;
};

module.exports = parseData;
