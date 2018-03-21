const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const config = require('../../config');

const repoFolder = config.repo;
const defaultSpawnOptions = { 
  cwd: `${path.resolve(__dirname)}/../../${repoFolder}`,
};

const defaultExecuteCliOptions = {
  isLookForErrors: true,
  pathModificator: '',
};

function executeCliCommand(bashText, executeCliOptions = defaultExecuteCliOptions) {
  const {
    isLookForErrors,
    pathModificator,
  } = executeCliOptions;
  const commandWords = bashText.split(' ');
  const [command, ...keys] = commandWords;
  const spawnOptions = { ...defaultSpawnOptions };
  if (pathModificator) {
    spawnOptions.cwd += `/${pathModificator}`;
  }
  const executing = spawn(command, keys, spawnOptions);
  return new Promise((resolve, reject) => {
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
    executing.on('close', (code) => {
      if (result.body) {
        console.log(result.body.toString());
        // конвертируем unit8Array в stringArray
        result.body = result.body.toString().split('\n');
        result.body = result.body.filter(s => s !== '');
      }
      resolve(result);
    });
  });
}

module.exports = executeCliCommand;
