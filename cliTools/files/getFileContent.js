const readFilePromise = require('fs-readfile-promise');
const path = require('path');

const config = require('../../config');

const repoFolder = config.repo;

async function getFileContent(pathToFile) {
  const filePath = `${repoFolder}/${pathToFile}`;
  const result = {
    body: '',
    errors: [],
  };
  try {
    const buffer = await readFilePromise(filePath);
    result.body = buffer;
  } catch (error) {
    result.errors.push(error);
  }
  return result;
}

module.exports = getFileContent;
