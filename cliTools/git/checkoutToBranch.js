const executeCliCommand = require('./executeCliCommand');

async function checkoutToBranch(branchName) {
  const bashText = `git checkout ${branchName}`;
  const isLookForErrors = false;
  const checkoutResult = await executeCliCommand(bashText, isLookForErrors);
  return checkoutResult;
}

module.exports = checkoutToBranch;
