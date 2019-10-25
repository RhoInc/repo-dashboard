export default function releases() {
    const selection = d3.select('.releases');
    const converter = new showdown.Converter(); // converts markdown to html

    return fetch('data/releases.json')
        .then(response => response.json())
        .then(json => {
            const latestReleases = Object.keys(json)//identifying keys
                .map(key => json[key])//mapping keys to values
                .filter(releases => releases.length > 0)//filering out redundand objects?
                .map(releases => {
                    releases.forEach(release => {
                        release.date = new Date(release.created_at);//get the release dates
                        release.repo = release.url.split('/')[5];// get the repo name 
                        release.repo_url = 'https://github.com/RhoInc/' + release.repo; //create repo url
                        release.latest_version = release.tag_name; //get latest released version
                        release.tableDate = release.created_at.split("T")[0]
                    })

                return releases.sort((a,b) => b.date.getTime()- a.date.getTime())[0] //getting the latest release for each renderer
                })
                .sort((a, b) => b.date.getTime() - a.date.getTime());

                return latestReleases.map( release => {
                    return {name: release.repo,
                            "last update": release.tableDate,
                            "latest release": release.latest_version}
                })
         })
         
}