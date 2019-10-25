export default function repos() {
    const selection = d3.select('.releases');
    const converter = new showdown.Converter(); // converts markdown to html

   return fetch('data/repos.json')
        .then(response => response.json())
        .then(json => {
            var repoIssues = Object.values(json)//identifying values
                .map( repo => {
                    return {name: repo.name,
                            issues: repo.open_issues}
                })

              return repoIssues

         })
         

}