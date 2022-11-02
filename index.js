const rp = require("request-promise");
const cheerio = require("cheerio");
const animes = require("./modules/animes");

const url = "https://animesonline.cc/generos/";

rp(url)
  .then((html) => {
    const $ = cheerio.load(html);
    const list = [];
    const total = $("p > a").length;
    for (let index = 0; index < total; index++) {
      let item = $("p > a")[index].childNodes[0].data;
      let link = $("p > a")[index].attribs.href;
      let obj = { item, link };
      list.push(obj);
    }
    return Promise.all(
      list.map((url) => {
        console.log(url);
        return animes(url.link);
      })
    );
  })
  .then((a) => {
    console.log(a);
  })
  .catch((e) => console.log(e));
