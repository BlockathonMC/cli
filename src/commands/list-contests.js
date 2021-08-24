const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'list-contests';
exports.describe = 'List all contests';

exports.handler = async (argv) => {
    ui.writeInfo('Fetching contests...');
    
    const contests = await query('SELECT * FROM contests');
    const table = new Table();

    for (let contest of contests) {
        table.cell('ID', chalk.yellow(contest.id));
        table.cell('Status', chalk.green(contest.status));
        table.cell('Name', contest.name);
        table.cell('Summary', contest.summary);
        table.newRow();
    }

    console.log(table.toString());
    process.exit();
}