const chalk = require('chalk');
const osmosis = require('osmosis');

module.exports = () => {
  osmosis
    .get(`http://www.stocktwits.com`)
    .set({
      tickers: ['.with-ticker-card@data-symbol'],
    })
    .data((res) => {
      if (!res.tickers || !res.tickers.length) {
        return console.log('\nCould not find any trending tickers.')
      }


      console.log('\n'+ chalk.white.bold(res.tickers.join(' ')));
    });
}
