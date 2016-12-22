const chalk = require('chalk');
const osmosis = require('osmosis');

module.exports = () => {
  osmosis
    .get(`http://www.stocktwits.com`)
    .set({
      tickers: ['.with-ticker-card@data-symbol'],
    })
    .data((data) => {
      if (!data.tickers || !data.tickers.length) {
        return console.log('\nCould not find any trending tickers.')
      }


      console.log('\n'+ chalk.white.bold(data.tickers.join(' ')));
    });
}
