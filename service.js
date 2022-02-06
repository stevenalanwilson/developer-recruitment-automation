class ManageDeveloperTechTests {

    constructor(client) {
        this.client = client
    }

    async setupCandidateTechtest(config, utils) {
        try {
            const repository = await this.createTechTest(utils, config)
            return await this.addContributorToTechTest(repository, config) 
        } catch (error) {
            throw error
        }
    }

    async createTechTest(utils, config) {
        if(await this.doesRepoExist(config)) {
            try {
                return await this.client.cloneRepo(
                    utils.generateRepoName(config.contributor), 
                    config.templateowner, 
                    config.templaterepo
                )
            } catch (error) {
                throw error
            }
            
        } else {
            throw new Error(`The repository ${config.templaterepo} does not exist`);   
        }
    }

    async addContributorToTechTest(repository, config) {
        if(await this.doesUserExist(config.contributor)) {
            try {
                return await this.client.addContributorToRepo(
                    config.contributor, 
                    repository.data.owner.login, 
                    repository.data.name,
                )
            } catch (error) {
                throw error
            }
        } else {
            throw new Error(`the username ${config.contributor} does not exist`);   
        }
        
    }

    async doesRepoExist(config) {
        try {
            await this.client.checkRepo(config.templateowner, config.templaterepo)
            return true
        } catch (error) {
            return false
        } 
    }

    async doesUserExist(username) {
        try {
            await this.client.checkUsername(username)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    ManageDeveloperTechTests
};