const yargs = require('yargs');

yargs.command(require('./src/commands/list-contests'));
yargs.command(require('./src/commands/setup-repo'));
yargs.command(require('./src/commands/setup-all-repos'));
yargs.argv;