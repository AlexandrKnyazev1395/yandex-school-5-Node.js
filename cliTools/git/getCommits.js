const trim = require('lodash.trim');

const executeCliCommand = require('./executeCliCommand');

/**
 * Получение  комитов в гит-репозитории
 * @param {string} destination название ветки или хэш комита в котором происходит поиск
 * @returns {Object} объект содержащий body и errors
 */
async function getCommits(destination, execute = executeCliCommand) {
  const bashText = `git log ${destination} --date=iso --pretty=format:%h_%cd_%s_%ae --`;
  const sourcesData = await execute(bashText);
  if (!sourcesData.errors.length) {
    sourcesData.body = parseCommits(sourcesData.body); 
  }
  return sourcesData;
}

function parseCommits(commits) {
  return commits.map((commit) => {
    const commitInfoArray = trim(commit, ',').split('_');
    const [hash, ...extraCommitInfoArray] = commitInfoArray;
    const extraCommitInfo = extraCommitInfoArray.join(', ');
    return {
      hash,
      extraCommitInfo,
    };
  });
}

module.exports = {
  getCommits,
  parseCommits,
};
