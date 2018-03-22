const executeCliCommand = require('./executeCliCommand');

/**
 * 
 
 */
async function getSources(destination, pathModificator) {
  const bashText = `git ls-tree ${destination}`;
  const executeCliOptions = { isSplitByEnter: true };
  if (pathModificator) {
    executeCliOptions.pathModificator = pathModificator;
  }
  const sourcesData = await executeCliCommand(bashText, executeCliOptions);
  if (!sourcesData.errors.length) {
    sourcesData.body = separateFoldersAndFiles(sourcesData.body, pathModificator); 
  }
  return sourcesData;
}

/**
 * Парсинг результата функции git ls-tree https://git-scm.com/docs/git-ls-tree
 * @description Парсит из каждой строки тип (файл/папка), 
 *    добавляет к названиям папок знак '/', возвращает объект из двух массивов - файлов и папок
 * @param {String} sources - строка, полученная на выходе из функции git ls-tree
 * @param {String} pathModificator - строка, являющаяся путем к директории папки/файла
 * @returns {object} - объект с двумя ключами: files и folders. 
 *    files и folders содержат массивы объектов с именами файлов/папок и путей к ним
 */
function separateFoldersAndFiles(sources, pathModificator) {
  const files = [];
  const folders = [];
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i].toString();
    const sourceInfoArray = source.split(/\s/);
    const type = sourceInfoArray[1];
    const file = sourceInfoArray[3];
    let sourceName = file;
    let sourcePath = pathModificator ? pathModificator + sourceName : sourceName;
    if (type === 'tree') {
      sourceName += '/';
      sourcePath += '/';
      folders.push({ sourceName, sourcePath });
    } else {
      files.push({ sourceName, sourcePath });
    }
  }
  return {
    files, 
    folders,
  };
}

module.exports = getSources;
