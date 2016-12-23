#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');

// Import commands
const now = require('./commands/now');
const headlines = require('./commands/headlines');
const fundamentals = require('./commands/fundamentals');
const trending = require('./commands/trending');

program
  .version(pkg.version)
  .description(pkg.description);

program
  .command('now <ticker>')
  .description('Fetches a stocks current performance on the day')
  .action(now);

program
  .command('fundamentals <ticker>')
  .description('Fetches fundamentals for a ticker')
  .action((ticker) => now(ticker).done(() => fundamentals(ticker)));

program
  .command('headlines <ticker>')
  .description('Fetches the lastest headlines for a ticker')
  .action(headlines);

program
  .command('trending')
  .description('Fetches a list of trending tickers from StockTwits')
  .action(trending);

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
