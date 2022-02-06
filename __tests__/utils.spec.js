const { utils } = require('../utils');

describe('Utils', () => {
  test('String formatted correctly', async () => {
    const repository_name = utils.generateRepoName('johnsmith01');
    expect(repository_name).toBe('johnsmith01-moj-tech-test');
  });
});
