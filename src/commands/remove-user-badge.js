const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'remove-user-badge <user> <id>'; 
exports.describe = 'Remove a profile badge from a user';

exports.builder = (yargs) => {
    yargs.positional('user', { type: 'number', describe: 'The ID of the user' });
    yargs.positional('id', { type: 'number', describe: 'The ID of the badge' });
}

exports.handler = async (argv) => {
    ui.writeInfo('Removing badge...');
    
    const insert = await query('DELETE FROM user_badges WHERE user = ? AND id = ?', [argv.user, argv.id]);

    if (insert.affectedRows === 0) {
        return ui.writeError('Badge wasn\'t removed');
    }

    ui.writeCreate(`Removed profile badge ${argv.id} from user ${argv.user}`);
   
    process.exit();
}