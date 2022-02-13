const utils = {
    generateRepoName: (name) => `${name.replace(/\s+/g, '-').toLowerCase()}-moj-tech-test`,

    GetLastCandidateFromList: (listOfCandidates) => listOfCandidates[listOfCandidates.length - 1]
}

module.exports = {
    utils,
}
