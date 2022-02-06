const { Octokit } = require('@octokit/core');
const dotenv = require('dotenv');

dotenv.config();

const octokit = new Octokit({ auth: process.env.TOKEN });

const client = {
  
  checkUsername: async (username) => {
    try {
      return await octokit.request('GET /users/{username}', {
        username: username
      })
    } catch (error) {
      throw error
    }
  },
  
  checkRepo: async (templateOwner, templateRepo) => {
    try {
      return await octokit.request('GET /repos/{template_owner}/{template_repo}', {
        template_owner: templateOwner,
        template_repo: templateRepo
      })
    } catch (error) {
      throw error
    }
  },

  cloneRepo: async (name, templateOwner, templateRepo) => {
    try {
      return await octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
        template_owner: templateOwner,
        template_repo: templateRepo,
        name,
        private: true,
        mediaType: {
          previews: [
            'baptiste',
          ],
        },
      });
    } catch (error) {
      throw error
    }
  },
  
  addContributorToRepo: async (candidiate, owner, repository) => {
    try {
      return await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
        owner,
        repo: repository,
        username: candidiate,
        permission: 'permission',
      });
    } catch (error) {
      throw error
    }
  }
}

module.exports = {
  client,
};


