const { client } = require('../client');
const { utils } = require('../utils')
const {ManageDeveloperTechTests} = require('../service')
const { newRepoFromTemplate, addContributorToRepo } = require('../dataMocks/201')
const nock = require('nock')
const service = new ManageDeveloperTechTests(client);

describe('The service works as expected', () => {

  test('Return true if user exists', async () => {
    
    nock('https://api.github.com')
      .get('/users/octocat').reply(200)
    
    const user = await service.doesUserExist('octocat');
    expect(user).toBe(true);
  });

  test('Return false if user does not exists', async () => {
    
    nock('https://api.github.com')
      .get('/users/zombie').reply(404)
    const user = await service.doesUserExist(client, 'zombie');
    expect(user).toBe(false);
  });

  test('Return true if repo exists', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(200)

    const config = {
      templateowner: 'octocat',
      templaterepo: 'hello-world'
    }
    
    const repo = await service.doesRepoExist(config);
    expect(repo).toBe(true);
  });

  test('Return false if repo does not exists', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(404)
    
    const config = {
      templateowner: 'octocat',
      templaterepo: 'hello-world'
    }
    
    const repo = await service.doesRepoExist(config);
    expect(repo).toBe(false);
  });

  test('Add contributer to reposity', async () => {
    
    nock('https://api.github.com')
      .get('/users/octocat').reply(200)
      .put('/repos/octocat/hello-world/collaborators/octocat').reply(201)

    const config = {
      username: 'octocat',
      contributor: 'octocat',
      templateowner: 'octocat',
    }

    const newRepoFromTemplate = {
      data: {
        name: 'hello-world',
        owner: {
          login: 'octocat',
        }
      }
    }
    const response = await service.addContributorToTechTest(newRepoFromTemplate, config);
    expect(response.status).toBe(201);
  });

  test('Fails Add contributer to reposity becuase user does not exist', async () => {
    
    nock('https://api.github.com')
      .get('/users/Zombie').reply(404)
      .put('/repos/octocat/hello-world/collaborators/octocat').reply(201)

    const config = {
      contributor: 'Zombie',
      templateowner: 'octocat',
    }

    const newRepoFromTemplate = {
      name: 'hello-world'
    }
    try {
      await service.addContributorToTechTest(newRepoFromTemplate, config);
    } catch (error) {
      expect(error.message).toBe('the username Zombie does not exist');
    }
  });

  test('Creates a tech test from a template', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(200)
      .post('/repos/octocat/hello-world/generate').reply(201, newRepoFromTemplate)

    const config = {
      contributor: 'octocat',
      templateowner: 'octocat',
      templaterepo: 'hello-world'
    }
    const techTest = await service.createTechTest(utils, config);
    expect(techTest.data.name).toBe('Hello-World');
  });

  test('Fails to creates a tech test from a template becuase repo does not exist', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/ZombieWorld').reply(404)
      .post('/repos/octocat/ZombieWorld/generate').reply(201, newRepoFromTemplate)

    const config = {
      contributor: 'octocat',
      templateowner: 'octocat',
      templaterepo: 'ZombieWorld'
    }
    try {
      await service.createTechTest(utils, config);
    } catch (error) {
      expect(error.message).toBe('The repository ZombieWorld does not exist');
    }
  });

  test('Setup and create a candidate technical test', async () => {

    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(200)
      .post('/repos/octocat/hello-world/generate').reply(201, newRepoFromTemplate)
      .get('/users/octocat').reply(200)
      .put('/repos/octocat/Hello-World/collaborators/octocat').reply(201, addContributorToRepo)
      
    const config = {
      username: 'octocat',
      templateowner: 'octocat',
      templaterepo: 'hello-world',
      contributor: 'octocat'
    }

  const CandidatesText = await service.setupCandidateTechtest(config, utils)
  expect(CandidatesText.data.repository.name).toBe('Hello-World');
  expect(CandidatesText.data.repository.owner.login).toBe('octocat');

  });

});
