const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'list-users';
exports.describe = 'List all users';

exports.handler = async (argv) => {
    ui.writeInfo('Fetching users...');
    
    const users = await query('SELECT * FROM users');
    const table = new Table();

    for (let user of users) {
        table.cell('ID', chalk.yellow(user.id));
        table.cell('GitHub User ID', chalk.green(user.github_user_id));
        table.cell('Email', user.email);
        table.cell('Username', user.username);
        table.cell('Admin', user.admin);
        table.newRow();
    }

    console.log(table.toString());
    process.exit();
}