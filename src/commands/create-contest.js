const Table = require('easy-table');
const chalk = require('chalk');
const process = require('process');
const { query } = require('../data/mysql');
const ui = require('../cli/ui');

exports.command = 'create-contest <name> <year> <slug> <summary>'; 
exports.describe = 'Create a contest';

exports.builder = (yargs) => {
    yargs.positional('name', { type: 'string', describe: 'The name of the contest' });
    yargs.positional('year', { type: 'number', describe: 'The year the contest will run in' });
    yargs.positional('slug', { type: 'string', describe: 'The URL slug (e.g. plugin-dev)' });
    yargs.positional('summary', { type: 'string', describe: 'A short summary of the contest' });
    // yargs.positional('startDate', { type: 'string', describe: 'The date the contest starts' });
    // yargs.positional('endDate', { type: 'string', describe: 'The date the contest ends' });
}

exports.handler = async (argv) => {
    const currentDate = new Date();

    if (Number.isNaN(argv.year) || argv.year < currentDate.getFullYear()) {
        return ui.writeError('Invalid year');
    }

    ui.writeInfo('Creating contest...');

    const insert = await query('INSERT INTO contests (name, year, slug, summary, description) VALUES (?,?,?,?,?)', [
        argv.name, argv.year, argv.slug, argv.summary, ''
    ]);

    if (insert.affectedRows === 0) {
        return ui.writeError('Contest wasn\'t added to database');
    }

    ui.writeCreate(`Contest ${argv.name} created (id: ${insert.insertId})`);
   
    process.exit();
}