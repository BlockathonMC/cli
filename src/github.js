const { Octokit } = require('@octokit/core');
const config = require('../config.json');
const package = require('../package.json');

const octokit = new Octokit({
    auth: config.githubAccessToken,
    userAgent: `${package.name}/${package.version}`
});

module.exports = octokit;