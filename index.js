const rp = require("request-promise");

const url = "https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Brasil";

rp(url)
  .then((html) => {
    console.log(html);
  })
  .catch((err) => {
    console.error(err);
  });
