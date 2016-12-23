const chalk = require('chalk');
const osmosis = require('osmosis');
const Table = require('cli-table');
const loader = require('../loader');
const now = require('./now');

const table = new Table({
  style: {
    head: ['cyan']
  }
})

module.exports =  (ticker) => {
  now(ticker).done(() => {
    loader.start();

    osmosis
      .get(`http://www.google.com/finance?q=${ticker}`)
      .set({
        range: '.snap-data td[data-snapfield="range"] + td',
        range_52week: '.snap-data td[data-snapfield="range_52week"] + td',
        open: '.snap-data td[data-snapfield="open"] + td',
        vol_and_avg: '.snap-data td[data-snapfield="vol_and_avg"] + td',
        market_cap: '.snap-data td[data-snapfield="market_cap"] + td',
        pe_ratio: '.snap-data td[data-snapfield="pe_ratio"] + td',
        dividend_yield: '.snap-data td[data-snapfield="latest_dividend-dividend_yield"] + td',
        eps: '.snap-data td[data-snapfield="eps"] + td',
        shares: '.snap-data td[data-snapfield="shares"] + td',
        beta: '.snap-data td[data-snapfield="beta"] + td',
        inst_own: '.snap-data td[data-snapfield="inst_own"] + td',
      })
      .data((data) => {
        loader.stop();

        for (const key in data) {
          let obj = {};
          obj[key.replace(/_/g, ' ')] = data[key]
          table.push(obj);
        }

        console.log(`\n${chalk.white('Fundamentals')}`)
        console.log(table.toString());
      })
  });
}
