const executeCliCommand = require('./executeCliCommand');
const trim = require('lodash.trim');
/**
 * Получение списка веток репозитория
 * @returns {Object} объект содержащий body и errors
 */
async function getBranches() {
  const bashText = 'git branch';
  const branchesData = await executeCliCommand(bashText);
  if (!branchesData.errors.length) {
    branchesData.body = parseBranches(branchesData.body); 
  }
  return branchesData;
}

/**
 * Парсит результат функции git branch
 * @param {array} branches - список веток, полученных в результате выполнения git branch
 * @returns {array} список названий веток без лишних символов
 */
function parseBranches(branches) {
  // обрезаем звездочку у текущей ветки
  return branches.map(branch => trim(trim(branch, '*'), ' ')); 
}

module.exports = getBranches;
