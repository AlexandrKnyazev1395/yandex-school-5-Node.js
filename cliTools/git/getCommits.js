const trim = require('lodash.trim');

const executeCliCommand = require('./executeCliCommand');

async function getCommits(destination) {
  const bashText = `git log ${destination} --date=iso --pretty=format:%h_%cd_%s_%ae`;
  const sourcesData = await executeCliCommand(bashText);
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

module.exports = getCommits;
