const executeCliCommand = require('./executeCliCommand');

/**
 * Получение контента файла
 * @param {string} destination название ветки или хэш комита в котором происходит поиск
 * @param {string} path путь к файлу
 * @returns {Object} объект содержащий body и errors
 */
async function getFileContent(destination, path, execute = executeCliCommand) {
  const bashText = `git show ${destination}:${path}`;
  const executeCliOptions = { isSplitByEnter: false };
  const fileContent = await execute(bashText, executeCliOptions);
  return fileContent;
}

module.exports = {
  getFileContent,
};

