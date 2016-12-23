const chalk = require('chalk');
const osmosis = require('osmosis');
const loader = require('../loader');

module.exports = (ticker) => {
  loader.start();

  return osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      companyName: '#qwidget_pageheader > h1',
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


      const header = chalk.dim(`${ticker.toUpperCase()} - ${data.companyName.split(',')[0]}`);
      const metrics = chalk.bold(`${data.lastSale} ${chalk[performance].bold(`${arrow} ${data.netChange} (${data.percentChange})`)}`);

      console.log('');
      console.log(header);
      console.log(metrics);
    });
};
