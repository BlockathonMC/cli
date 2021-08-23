const { Octokit } = require('@octokit/core');
const config = require('../config.json');

const octokit = new Octokit({
    auth: config.githubAccessToken
});

module.exports = octokit;