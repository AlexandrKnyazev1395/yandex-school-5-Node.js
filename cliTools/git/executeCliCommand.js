
const { spawn } = require('child_process');

const config = require('../../config');

const repoFolder = config.repo;
const defaultSpawnOptions = { 
  cwd: repoFolder,
};

const defaultExecuteCliOptions = {
  isLookForErrors: true,
  isSplitByEnter: true,
};

/**
 * Выполнение команды в cli с помощью модуля child_process
 * @description выполняется команда spawn модуля child_process, считывается поток данных,
 *  заполняются массивы с результатами и ошибками 
 * @param {string} bashText bash-команда для выполнения
 * @param {object} executeCliOptions кастомные опции для обработки результатов команды
 * @returns {Promise} промис завершается когда завершен поток вывода результатов выполнения команды
 */
function executeCliCommand(bashText, executeCliOptions = defaultExecuteCliOptions) {
  const {
    isLookForErrors,
    isSplitByEnter,
  } = executeCliOptions;
  const commandWords = bashText.split(' ');
  const [command, ...keys] = commandWords;
  const spawnOptions = { ...defaultSpawnOptions };
  const executing = spawn(command, keys, spawnOptions);
  return new Promise((resolve) => {
    const result = {
      errors: [],
      body: [],
    };
    executing.stdout.on('data', (data) => {
      result.body.push(data);
    });
    executing.stderr.on('data', (data) => {
      if (isLookForErrors) {
        result.errors.push(data);
      }
    });
    executing.on('close', () => {
      if (result.body) {
        if (isSplitByEnter) {
          // конвертируем unit8Array в stringArray
          result.body = result.body.toString().split('\n');
          result.body = result.body.filter(s => s !== '');
        }
      }
      resolve(result);
    });
  });
}

module.exports = executeCliCommand;
