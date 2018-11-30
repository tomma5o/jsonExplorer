const chalk = require('chalk');
const { log } = console;

const successMsg = (msg) => { log(chalk.green(msg)); }
const errorMsg = (msg) => { log(chalk.red(msg)); }
const warningMsg = (msg) => { log(chalk.yellow(msg)); }
const infoMsg = (msg) => { log(chalk.blue(msg)); }

const usageMsg = "\n\n" +  
                chalk.blue("Usage") +
                "\n  $ fx [code ...]\n" +
                chalk.blue("Example") +
                "\n  $ echo '{'key': 'value'}' | jxplore 'vehicle.obj'";

module.exports = {
    successMsg,
    errorMsg,
    warningMsg,
    infoMsg,
    usageMsg
}