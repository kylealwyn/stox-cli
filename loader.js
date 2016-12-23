const ora = require('ora')

let spinner;

module.exports = {
  start(phrase) {
    spinner = ora(phrase || 'Loading...').start();
  },

  stop() {
    spinner.stop();
    spinner.clear();
  }
}
