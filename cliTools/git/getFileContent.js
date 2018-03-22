const executeCliCommand = require('./executeCliCommand');

async function getFileContent(destination, path) {
  const bashText = `git show ${destination}:${path}`;
  const executeCliOptions = { isSplitByEnter: false };
  const fileContent = await executeCliCommand(bashText, executeCliOptions);
  if (!fileContent.errors.length) {
    fileContent.body = fileContent.body.join('/n');
    fileContent.body = decodeURIComponent(fileContent.body);
  }
  return fileContent;
}

module.exports = getFileContent;
