import chalk from 'chalk';
import osmosis from 'osmosis';

export default (ticker) => {
  osmosis
    .get(`http://www.nasdaq.com/symbol/${ticker}`)
    .set({
      lastSale: '#qwidget_lastsale',
      netChange: '#qwidget_netchange',
      percentChange: '#qwidget_percent',
      upOrDown: '#qwidget-arrow > div@class'
    })
    .data((res) => {
      if (!res.lastSale) {
        return log('\nPlease use a real ticker.')
      }

      const {
        lastSale,
        netChange,
        percentChange,
        upOrDown
      } = res;

      const performance = upOrDown.includes('red') ? 'red' : 'green';
      const arrow = performance === 'red' ? '⬇' : '⬆';
      const output = chalk.white.bold(
        `\n${ticker.toUpperCase()} ${lastSale} ${chalk[performance].bold(`${arrow} ${netChange} ${percentChange}`)}`
      );

      console.log(output);
    });
}
