const yargs = require('yargs');

yargs.command(require('./src/commands/create-contest'));
yargs.command(require('./src/commands/list-contests'));
yargs.command(require('./src/commands/setup-repo'));
yargs.command(require('./src/commands/setup-all-repos'));
yargs.command(require('./src/commands/list-users'));
yargs.command(require('./src/commands/set-user-admin'));
yargs.command(require('./src/commands/list-user-badges'));
yargs.command(require('./src/commands/add-user-badge'));
yargs.command(require('./src/commands/remove-user-badge'));
yargs.argv;