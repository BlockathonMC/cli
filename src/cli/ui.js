const chalk = require('chalk');

class UI {

    writeLine(text) {
        console.log(text);
    }

    writeInfo(text) {
        this.writeLine(chalk.blue('  info: ') + text);
    }

    writeNotice(text) {
        this.writeLine(chalk.cyan('  notice: ') + text);
    }

    writeCreate(text) {
        this.writeLine(chalk.green('  create: ') + text);
    }

    writeWarning(text) {
        this.writeLine(chalk.yellow('  warning: ') + text);
    }

    writeError(text) {
        this.writeLine(chalk.red('  error: ') + text);
    }
}

module.exports = new UI;