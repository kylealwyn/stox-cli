import program from 'commander';
import { version, description } from './package.json';

// Import commands
import {
  now,
  trending,
  headlines
} from './commands';

program
  .version(version)
  .description(description)

program
  .command('now <ticker>')
  .description('Fetches a stocks current performance on the day')
  .action(now)

program
  .command('headlines <ticker>')
  .description('Fetches the lastest headlines for a ticker')
  .action(headlines)

program
  .command('trending')
  .description('Fetches a list of trending tickers from StockTwits')
  .action(trending)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
