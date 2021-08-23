const chalk = require('chalk');
const { query } = require('../data/mysql');
const octokit = require('../github');
const ui = require('../cli/ui');

exports.command = 'setup-all-repos <contest>';
exports.describe = 'Setup GitHub repos for all users';

exports.builder = (yargs) => {
    return yargs
        .positional('contest', { type: 'number' })
        .option('force', { describe: 'Force a repo to be created for users if they have not enrolled in a contest' })
}

exports.handler = async (argv) => {
    try {
        if (Number.isNaN(argv.contest)) {
            return ui.writeError('Invalid contest id');
        }

        if (!argv.force) {
            const contestants = await query('SELECT * FROM contestants WHERE contest = ?', [argv.contest]);

            if (contestants.length === 0) {
                return ui.writeWarning(`No contestants for contest ${argv.contest}, did you mean to use --force?`);
            }
        }

        const users = await query('SELECT * FROM users');
        if (users.length === 0) {
            return ui.writeError(`Users not found`);
        }

        const setupRepoFile = require('./setup-repo');

        ui.writeInfo(`Creating repositories for ${users.length} users...`);

        for (let user of users) {
            const repoName = `${user.username}-${Math.random()}`;

            await setupRepoFile.createRepo(repoName, user.username);
            await setupRepoFile.addMaintainer(repoName, user.username);
        }
       
        console.log('Done!');
    } catch (e) {
        console.log('Failed to set up repos', e);
    }
    process.exit();
}