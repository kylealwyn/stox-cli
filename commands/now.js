const chalk = require('chalk');
const osmosis = require('osmosis');

module.exports = (ticker) => {
  osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      lastSale: '#qwidget_lastsale',
      netChange: '#qwidget_netchange',
      percentChange: '#qwidget_percent',
      upOrDown: '#qwidget-arrow > div@class'
    })
    .data((data) => {
      if (!data.lastSale) {
        return console.log('\nPlease use a real ticker.')
      }

      const performance = data.upOrDown.includes('red') ? 'red' : 'green';
      const arrow = performance === 'red' ? '⬇' : '⬆';
      const output = chalk.white.bold(
        `\n${ticker.toUpperCase()} ${data.lastSale} ${chalk[performance].bold(`${arrow} ${data.netChange} ${data.percentChange}`)}`
      );

      console.log(output);
    });
}
