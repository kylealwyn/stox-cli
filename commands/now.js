const chalk = require('chalk');
const osmosis = require('osmosis');
const loader = require('../loader');

module.exports = (ticker) => {
  loader.start();
  return osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      lastSale: '#qwidget_lastsale',
      netChange: '#qwidget_netchange',
      percentChange: '#qwidget_percent',
      upOrDown: '#qwidget-arrow > div@class'
    })
    .data((data) => {
      loader.stop();

      if (!data.lastSale) {
        return console.error('\Ticker not found.')
      }

      const performance = data.upOrDown.includes('red') ? 'red' : 'green';
      const arrow = performance === 'red' ? '⬇' : '⬆';
      const output = chalk.white.bold(
        `\n${ticker.toUpperCase()} ${data.lastSale} ${chalk[performance].bold(`${arrow} ${data.netChange} ${data.percentChange}`)}`
      );

      console.log(output);
    });
};
