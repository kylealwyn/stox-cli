const logUpdate = require('log-update')
const cliSpinners = require('cli-spinners');

let interval;

module.exports = {
  start() {
    const spinner = cliSpinners.dots;
    let i = 0;

    interval = setInterval(() => {
    	const frames = spinner.frames;
    	logUpdate(`\n${frames[i = ++i % frames.length]} Loading...`);
    }, spinner.interval);
  },

  stop() {
    clearInterval(interval);
    logUpdate.clear();
  }
}
