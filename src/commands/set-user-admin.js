const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'set-user-admin <id> <value>'; 
exports.describe = 'Make a user admin';

exports.builder = (yargs) => {
    yargs.positional('id', { type: 'number', describe: 'The ID of the user' });
    yargs.positional('value', { type: 'boolean', describe: 'true to make admin, false to remove' });
}

exports.handler = async (argv) => {
    ui.writeInfo('Changing admin state...');

    const update = await query('UPDATE users SET admin = ? WHERE id = ?', [argv.value, argv.id]);

    if (update.affectedRows === 0) {
        return ui.writeError('User admin state wasn\'t changed');
    }

    ui.writeCreate(`Changed admin state for user ${argv.id} to ${argv.value}`);
   
    process.exit();
}