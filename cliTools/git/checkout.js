const executeCliCommand = require('./executeCliCommand');

async function checkout(branchName) {
  const bashText = `git checkout ${branchName}`;
  const isLookForErrors = false;
  const executeCliOptions = { isLookForErrors };
  const checkoutResult = await executeCliCommand(bashText, executeCliOptions);
  return checkoutResult;
}

module.exports = checkout;
