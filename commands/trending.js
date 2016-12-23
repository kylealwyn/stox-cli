const chalk = require('chalk');
const osmosis = require('osmosis');
const loader = require('../loader');


module.exports = () => {
  loader.start();

  return osmosis
    .get(`http://www.stocktwits.com`)
    .set({
      tickers: ['.with-ticker-card@data-symbol']
    })
    .data((data) => {
      loader.stop();

      if (!data.tickers || !data.tickers.length) {
        return console.error('\nTrending tickers not found.');
      }


      console.log('\n'+ chalk.white.bold(data.tickers.join(' ')));
    });
};
