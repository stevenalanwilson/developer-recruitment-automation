const { utils } = require('../utils');

describe('Utils', () => {
  test('String formatted correctly', async () => {
    const repository_name = utils.generateRepoName('johnsmith01');
    expect(repository_name).toBe('johnsmith01-moj-tech-test');
  });

  test('Get the last candidate from a list', async () => {
    ListOfCandidates = [
      {
        "id": 0,
        "Name": "John Wilson",
        "GithubUsername": "candidateGithubUsername"
      },
      {
        "id": 0,
        "Name": "Steven Wilson",
        "GithubUsername": "candidateGithubUsername"
      },
      {
        "id": 0,
        "Name": "Samuel Wilson",
        "GithubUsername": "candidateGithubUsername"
      },
    ]
    const lastCandidate = utils.GetLastCandidateFromList(ListOfCandidates);
    expect(lastCandidate.Name).toBe('Samuel Wilson');
  });
});
