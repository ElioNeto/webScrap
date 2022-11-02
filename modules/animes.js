const rp = require("request-promise");
const cheerio = require("cheerio");

const animes = () => {
  let url = "https://animesonline.cc/genero/acao/";

  return rp(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const total = $("article > .poster > a > img", html).length;
      const anime = [];
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

        anime.push(obj);
      }
      return anime;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = animes;
