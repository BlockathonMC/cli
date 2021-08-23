const chalk = require('chalk');
const { query } = require('../data/mysql');
const octokit = require('../github');
const ui = require('../cli/ui');

exports.command = 'setup-repo <contest> <user>';
exports.describe = 'Setup GitHub repo';

exports.builder = (yargs) => {
    return yargs
        .positional('contest', { type: 'number' })
        .positional('user', { type: 'number' })
        .option('force', { describe: 'Force a repo to be created for a user if they have not enrolled in a contest' })
}

exports.handler = async (argv) => {
    try {
        if (Number.isNaN(argv.contest) || Number.isNaN(argv.user)) {
            return ui.writeError('Invalid contest or user id');
        }

        if (!argv.force) {
            const contestant = await query('SELECT * FROM contestants WHERE user = ? AND contest = ?', [argv.user, argv.contest]);

            if (contestant.length === 0) {
                return ui.writeWarning(`Contestant with id ${argv.user} not found for contest ${argv.contest}, did you mean to use --force?`);
            }
        }

        const user = await query('SELECT * FROM users WHERE id = ?', [argv.user]);
        if (user.length === 0) {
            return ui.writeError(`User with id ${argv.user} not found`);
        }

        const repoName = `${user[0].username}-${Math.random()}`;

        ui.writeInfo('Creating repository...');
        await createRepo(repoName, user[0].username);

        ui.writeInfo('Adding maintainers...');
        await addMaintainer(repoName, user[0].username);

        // TODO: Push a skeleton to the repo via git
        
        console.log('Done!');
    } catch (e) {
        console.log('Failed to set up repo', e);
    }
    process.exit();
}

/**
 * Creates a GitHub repo in the BlockathonContest organization
 * with the given name.
 * 
 * @param {String} name The repo name
 */
async function createRepo(name) {
    const repoRequest = await octokit.request('POST /orgs/{org}/repos', {
        org: 'mytestorglol',
        name: name,
        description: 'Your Blockathon project',
        private: true,
        auto_init: true
    });

    switch (repoRequest.status) {
        case 201:
            ui.writeCreate(`Created repository ${name} on GitHub`);
            break;
        case 403:
            ui.writeError('Access to create GitHub repo forbidden');
            break;
        case 422:
            ui.writeError('Validation failed, can\t create GitHub repo');
            break;
    }
}

/**
 * Add the given  
 * 
 * @param {String} repoName The repo name
 * @param {String} username The users GitHub username
 */
async function addMaintainer(repoName, username) {
    const collabRequest = await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
        owner: 'mytestorglol',
        repo: repoName,
        username: username,
        permission: 'maintain'
    });

    switch (collabRequest.status) {
        case 201:
            ui.writeInfo(`Added ${username} as a repo maintainer`);
            break;
        case 204:
            ui.writeNotice(`${username} is already a repo maintainer`);
            break;
        case 403:
            ui.writeError('Access to add repo maintainer forbidden');
            break;
    }
}

module.exports.createRepo = createRepo;
module.exports.addMaintainer = addMaintainer;