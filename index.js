const rp = require("request-promise");
const cheerio = require("cheerio");

const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

rp(url)
  .then((html) => {
    //console.log(html);
    const $ = cheerio.load(html); // Carrega o HTML para a constante $
    const numberOfLinks = $("td > b > a", html).length;
    /* console.log($("td > b > a", html).length); // <td><b><a></a></b></td>
    console.log($("td > b > a", html)); // imprime os nodes no html */
    const wikiURLs = [];
    for (let i = 0; i < numberOfLinks; i++) {
      wikiURLs.push($("td > b > a", html)[i].attribs.href);
    }
    console.log(wikiURLs);
  })
  .catch((err) => {
    console.error(err);
  });
