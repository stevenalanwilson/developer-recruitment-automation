const { client } = require('../client');
const nock = require('nock')

describe('The client works as expected', () => {

  test('Clone a repo from a template', async () => {
    
    nock('https://api.github.com')
      .post('/repos/octocat/hello-world/generate').reply(201)
  
    const response = await client.cloneRepo('hello-world','octocat','hello-world');
    expect(response.status).toBe(201);
  });

  test('throw error when trying to clone a repo from a template', async () => {
    
    nock('https://api.github.com')
      .post('/repos/octocat/hello-world/generate').replyWithError('something awful happened')

    try {
      await client.cloneRepo('something','bad','happened');
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  test('Get a repo', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(200)

    const response = await client.checkRepo('octocat','hello-world');
    expect(response.status).toBe(200);
  });

  test('Repo does not exists', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(404)
    try {
      await client.checkRepo('octocat','hello-world');
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('Repo is private', async () => {
    
    nock('https://api.github.com')
      .get('/repos/octocat/hello-world').reply(403)
    try {
      await client.checkRepo('octocat','hello-world');
    } catch (error) {
      expect(error.status).toBe(403);
    }
  });

  test('Get a user', async () => {
    
    nock('https://api.github.com')
      .get('/users/octocat').reply(200)

    const response = await client.checkUsername('octocat');
    expect(response.status).toBe(200);
  });

  test('User could not be found', async () => {
    
    nock('https://api.github.com')
      .get('/users/octocat').reply(404)
    try {
      await client.checkUsername('octocat');
    } catch (error) {
        expect(error.status).toBe(404);
      }
  });

  test('Add a collaborators', async () => {
    
    nock('https://api.github.com')
      .put('/repos/octocat/hello-world/collaborators/octocat').reply(201)

    const response = await client.addContributorToRepo('octocat', 'octocat', 'hello-world');
    expect(response.status).toBe(201);
  });

  test('Collaborator all ready exists', async () => {
    
    nock('https://api.github.com')
      .put('/repos/octocat/hello-world/collaborators/octocat').reply(204)

    const response = await client.addContributorToRepo('octocat', 'octocat', 'hello-world');
    expect(response.status).toBe(204);
  });
});