const yargs = require('yargs');
const chalk = require('chalk');
const { query } = require('./src/data/mysql');

require('./src/data/mysql');
require('./src/github');

yargs.command(require('./src/commands/list-contests'));
yargs.command(require('./src/commands/setup-repo'));
yargs.command(require('./src/commands/setup-all-repos'));
yargs.argv;