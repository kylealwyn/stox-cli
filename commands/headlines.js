import chalk from 'chalk';
import osmosis from 'osmosis';

export default (ticker) => {
  osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}/real-time`)
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
