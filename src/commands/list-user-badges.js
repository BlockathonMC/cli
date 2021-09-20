const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'list-user-badges <user>';
exports.describe = 'List all profile badges for a user';

exports.builder = (yargs) => {
    yargs.positional('user', { type: 'number', describe: 'The ID of the user' });
}

exports.handler = async (argv) => {
    ui.writeInfo('Fetching profile badges...');

    const badges = await query('SELECT * FROM user_badges WHERE user = ?', [argv.user]);
    const table = new Table();

    if (badges.length === 0) {
        ui.writeError('That user has no profile badges!');
    } else {
        for (let badge of badges) {
            table.cell('ID', chalk.yellow(badge.id));
            table.cell('User ID', chalk.green(badge.user));
            table.cell('Color', badge.color);
            table.cell('Text', badge.text);
            table.newRow();
        }
        console.log(table.toString());
    }
    
    process.exit();
}