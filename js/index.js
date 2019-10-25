import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import addReleases from './addReleases';
import addRepos from './addRepos';



const releases = addReleases();
const repos = addRepos();

Promise.all(
    [
        releases,
        repos
    ]
).then(arr => {

    const [releases,repos] = arr;

    releases.forEach(function(release) {
        const repo = repos.find(e => e.name === release.name);
        console.log(repo)
        release.open_issues = repo.issues;
        
      });

//    console.log(releases)

      
    var releasesTable = webCharts.createTable(".releases",
    {nRowsPerPage: 20, bootstrap: false, headers: ["Name", "Last Update", "Latest Release", "Open Issues"]});
        releasesTable.init(arr[0]);

})

