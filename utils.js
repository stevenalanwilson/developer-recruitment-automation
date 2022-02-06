const utils = {
    generateRepoName: (name) => `${name.replace(/\s+/g, '-').toLowerCase()}-moj-tech-test`
}

module.exports = {
    utils,
}
