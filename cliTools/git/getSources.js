const executeCliCommand = require('./executeCliCommand');

async function getSources() {
  const bashText = 'git ls-files';
  const sourcesData = await executeCliCommand(bashText);
  if (!sourcesData.errors.length) {
    sourcesData.body = parseSources(sourcesData.body); 
  }
  return sourcesData;
}

function parseSources(sources) {
  const reg = /.+\//; // последовательность символов, затем слеш
  return sources.map((source) => {
    const folder = source.match(reg);
    if (folder) {
      return folder[0];
    }
    return source;
  });
}

module.exports = getSources;
