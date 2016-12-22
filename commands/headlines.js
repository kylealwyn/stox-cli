const chalk = require('chalk');
const osmosis = require('osmosis');

module.exports =  (ticker) => {
  osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      titles: ['#CompanyNewsCommentary_Header + ul > li > a'],
      links: ['#CompanyNewsCommentary_Header + ul > li > a@href']
    })
    .data((res) => {
      const { titles, links } = res;

      titles.forEach((title, i) => {
        console.log(chalk.white.bold(`\n${title} - ${chalk.blue(links[i])}`))
      })
    })
}
