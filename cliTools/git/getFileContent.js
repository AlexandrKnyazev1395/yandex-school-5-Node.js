const executeCliCommand = require('./executeCliCommand');

async function getFileContent(destination, path) {
  const bashText = `git show ${destination}:${path}`;
  const executeCliOptions = { isSplitByEnter: false };
  const fileContent = await executeCliCommand(bashText, executeCliOptions);
  return fileContent;
}

module.exports = getFileContent;
