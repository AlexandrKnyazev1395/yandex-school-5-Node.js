const executeCliCommand = require('./executeCliCommand');
const trim = require('lodash.trim');

async function getBranches() {
  const bashText = 'git branch';
  const branchesData = await executeCliCommand(bashText);
  if (!branchesData.errors.length) {
    branchesData.body = parseBranches(branchesData.body); 
  }
  return branchesData;
}

function parseBranches(branches) {
  // обрезаем звездочку у текущей ветки
  return branches.map(branch => trim(trim(branch, '*'), ' ')); 
}

module.exports = getBranches;
