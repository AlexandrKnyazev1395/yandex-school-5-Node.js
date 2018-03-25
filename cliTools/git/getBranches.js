const executeCliCommand = require('./executeCliCommand');
const trim = require('lodash.trim');
/**
 * Получение списка веток репозитория
 * @returns {Promise} ресолвит объект содержащий body и errors
 */
async function getBranches(execute = executeCliCommand) {
  const bashText = 'git branch';
  const branchesData = await execute(bashText);
  if (!branchesData.errors.length) {
    branchesData.body = parseBranches(branchesData.body); 
  }
  return Promise.resolve(branchesData);
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

module.exports = {
  getBranches,
  parseBranches,
};
