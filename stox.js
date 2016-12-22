#!/usr/bin/env node --harmony

'use strict';

const program = require('commander');
const pkg = require('./package.json');

// Import commands
const now = require('./commands/now');
const trending = require('./commands/trending');

program
  .version(pkg.version)
  .description(pkg.description)

program
  .command('now <ticker>')
  .description('Outputs a stocks current position')
  .action(now)

program
  .command('trending')
  .description('Displays a list of trending tickers on StockTwits')
  .action(trending)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
