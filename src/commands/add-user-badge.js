const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'add-user-badge <user> <color> <text>'; 
exports.describe = 'Add a profile badge to a user';

exports.builder = (yargs) => {
    yargs.positional('user', { type: 'number', describe: 'The ID of the user' });
    yargs.positional('color', { type: 'string', describe: 'Role color in hex' });
    yargs.positional('text', { type: 'string', describe: 'Role text' });
}

exports.handler = async (argv) => {
    ui.writeInfo('Adding badge...');

    const color = argv.color.startsWith('#') ? argv.color.substring(1) : argv.color;
    
    const insert = await query('INSERT INTO user_badges (user, color, text) VALUES (?, ?, ?)', [argv.user, color, argv.text]);

    if (insert.affectedRows === 0) {
        return ui.writeError('Badge wasn\'t added');
    }

    ui.writeCreate(`Added profile badge ${argv.name} to user ${argv.id}`);
   
    process.exit();
}