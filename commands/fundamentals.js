const chalk = require('chalk');
const osmosis = require('osmosis');
const Table = require('cli-table');
const loader = require('../loader');

const table = new Table({
  style: {
    head: ['cyan']
  }
})

module.exports =  (ticker) => {
  loader.start();

  osmosis
    .get(`http://finance.yahoo.com/quote/${ticker}`)
    .set({
      keys: ['#quote-summary tbody tr td:first-child span'],
      values: ['#quote-summary tbody tr td:last-child']

    })
    .data((data) => {
      loader.stop();

      const keys = data.keys;
      const values = data.values;

      if (!keys.length || !values.length) {
        return console.error(`Could load not fundamentals for ${ticker}`)
      }

      keys.forEach((key, index) => {
        let obj = {};
        obj[key] = values[index]
        table.push(obj);
      });

      console.log(`\n${chalk.dim('Fundamentals')}`)
      console.log(table.toString());
    });
}
