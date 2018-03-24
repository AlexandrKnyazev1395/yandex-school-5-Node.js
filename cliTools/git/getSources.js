const path = require('path');

const executeCliCommand = require('./executeCliCommand');

/**
 * Поиск файлов и папок в гит-репозитории
 * @description выполняется git-ls-tree, результат парсится и разделяется на папки и файлы
 * @param {string} destination название ветки или хэш комита в котором происходит поиск
 * @param {string} pathModificator путь, по которому следует производить поиск
 * @returns {Object} объект содержащий body и errors
 */
async function getSources(destination, pathModificator) {
  let bashText;
  if (pathModificator) {
    bashText = `git ls-tree ${destination} ${pathModificator}`;
  } else {
    bashText = `git ls-tree ${destination}`;
  }
  const executeCliOptions = { isSplitByEnter: true };
  const sourcesData = await executeCliCommand(bashText, executeCliOptions);
  if (!sourcesData.errors.length) {
    sourcesData.body = separateFoldersAndFiles(sourcesData.body, pathModificator); 
  }
  return sourcesData;
}

/**
 * Парсинг результата функции git ls-tree 
 * @description разделяются файлы и папки, к названиям папок добавляется знак '/'
 * @param {array} sources - строки, полученные в результате выполнения git ls-tree
 * @param {string} pathModificator - путь к директории
 * @returns {Object} - объект, содержащий массивы files и folders
 */
function separateFoldersAndFiles(sources, pathModificator) {
  const files = [];
  const folders = [];
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i].toString();
    const sourceInfoArray = source.split(/\s/);
    const type = sourceInfoArray[1];
    const file = path.basename(sourceInfoArray[3]);
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
