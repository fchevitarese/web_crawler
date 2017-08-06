const parseData = (data, page) => {
  // Parse the data, removing the empty elements and generating the objects.
  // TODO: Check if length of array is the same as header to save item.
  let object = { title: page.title, item: page.item };

  let tmp = data.split("|").filter(elem => {
    return elem.trim() !== "";
  });

  tmp.map((elem, i) => {
    sobject[[page.header[i]]] = elem.trim();
  });

  return object;
};

module.exports = parseData;
