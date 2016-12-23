const chalk = require('chalk');
const osmosis = require('osmosis');
const loader = require('../loader');

module.exports =  (ticker) => {
  loader.start();
  return osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      titles: ['#CompanyNewsCommentary_Header + ul > li > a'],
      links: ['#CompanyNewsCommentary_Header + ul > li > a@href']
    })
    .data((data) => {
      loader.stop();

      const links = data.links;
      const titles = data.titles;

      if (!links.length || !titles.length) {
        return console.error('Headlines not found.');
      }

      titles.forEach((title, i) => {
        console.log(chalk.white.bold(`\n${title} - ${chalk.blue(links[i])}`));
      });
    });
};
