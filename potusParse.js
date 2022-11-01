const rp = require("request-promise");
const cheerio = require("cheerio");

const url = "https://animesonline.cc/genero/escolar/page/1";

rp(url)
  .then((html) => {
    const $ = cheerio.load(html);
    const total = $("article > .poster > a > img", html).length;
    const wikiURLs = [];
    for (let index = 0; index < total; index++) {
      let image = $("article > .poster > a > img", html)[index].attribs.src;
      let link = $("article > .poster > a ", html)[index].attribs.href;
      let id = $("article", html)[index].attribs.id;
      let title = $(`#${id} > .data > h3 > a`).text();
      let obj = {
        id,
        image,
        link,
        title,
      };

      wikiURLs.push(obj);
    }
    console.log(wikiURLs);
  })
  .catch((err) => {
    console.log(err);
  });
