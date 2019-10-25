const fs = require('fs');
const fetch = require('node-fetch');
const defineHeaders = require('./defineHeaders');
const getRepos = require('./getRepos');


defineHeaders(headers => {
    Promise.all([getRepos(headers, false)])
        .then(() => {
            const getReleases = require('./getReleases');
            return Promise.all([getReleases(headers, false)]);
        })
        .then(() => {
            process.exit();
        });
});
