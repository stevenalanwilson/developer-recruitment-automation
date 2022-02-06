const { client } = require('./client');
const { utils } = require('./utils')
const { ManageDeveloperTechTests } = require('./service')

const service = new ManageDeveloperTechTests(client);

const config = {
    contributor: 'candidatename',
    templateowner: 'repo-owner', 
    templaterepo: 'repo-name' 
}

service.setupCandidateTechtest(config, utils)
    