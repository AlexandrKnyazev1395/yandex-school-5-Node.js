const trim = require('lodash.trim');

const executeCliCommand = require('./executeCliCommand');

async function getCommits() {
  const dateFormat = '%Y-%m-%d(%H:%M)';
  const bashText = `git log --pretty=format:%h_%cd_%s_%ae --date=format:${dateFormat}`;
  const sourcesData = await executeCliCommand(bashText);
  if (!sourcesData.errors.length) {
    sourcesData.body = parseCommits(sourcesData.body); 
  }
  return sourcesData;
}

function parseCommits(commits) {
  return commits.map((commit) => {
    const commitInfoArray = trim(commit, ',').split('_');
    let [hash, ...extraCommitInfo] = commitInfoArray;
    extraCommitInfo = extraCommitInfo.join(', ');
    return {
      hash,
      extraCommitInfo,
    };
  });
}

module.exports = getCommits;
