const { client } = require('./client');
const { utils } = require('./utils')
const { ManageDeveloperTechTests } = require('./service')

const candidates = require('./config/candidates.json');
const technicalTextRepoConfig = require('./config/technicalTextRepoConfig.json');

const service = new ManageDeveloperTechTests(client);

const config = {
    contributor: utils.GetLastCandidateFromList(candidates),
    templateowner: technicalTextRepoConfig.templateowner,
    templaterepo: technicalTextRepoConfig.templaterepo
}

service.setupCandidateTechtest(config, utils)
