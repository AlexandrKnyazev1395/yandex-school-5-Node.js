const { expect } = require('chai');

const { getSources, separateFoldersAndFiles } = require('../../../cliTools/git/getSources');

const sourcesStub = {
  body: [
    '100644 blob 12da4ba20030293b6462135c148ec13861e1ab67\t.dockerignore',
    '100644 blob d1d4ded72a2acda1d9ab59adecd2478df8e62053\t.eslintrc.js',
    '040000 tree afd50a7efb48407fa649a8108a5cae1b06904f3f\tcliTools',
    '040000 tree e2567d71a3499b7217306f6a102d6798e54bcb58\tclient',
  ],
  errors: [],
};

const parsedSourcesBodyStub = {
  files: [
    { 
      sourceName: '.dockerignore', 
      sourcePath: '.dockerignore',
    },
    { 
      sourceName: '.eslintrc.js', 
      sourcePath: '.eslintrc.js',
    },
    
  ],
  folders: [
    { 
      sourceName: 'cliTools/', 
      sourcePath: 'cliTools/',
    },
    { 
      sourceName: 'client/', 
      sourcePath: 'client/',
    },
  ],
};

const executeCliCommandStub = () => Promise.resolve({
  body: sourcesStub,
  errors: [],
});


describe('Получение файлов и папок', () => {
  describe('Функция возвращает верные данные', async () => {
    it('Промис возвращает объект со свойствами body и errors', async () => {
      const sources = await getSources('master', '', executeCliCommandStub);
      expect(sources).to.be.an('object').that.has.all.keys('body', 'errors');
    });

    it('В свойстве errors содержится пустой массив', async () => {
      const sources = await getSources('master', '', executeCliCommandStub);
      // eslint-disable-next-line
      expect(sources.errors).to.be.an('array').that.is.empty;
    });

    it('В свойстве body содержится объект с ключами files и folders, их значения - массивы', async () => {
      const sources = await getSources('master', '', executeCliCommandStub);
      expect(sources.body).to.be.an('object');
      expect(sources.body.files).to.be.an('array');
      expect(sources.body.folders).to.be.an('array');
    });
  });

  describe('Парсер работает правильно', () => {
    it('При передаче вывода функции executeCliCommand возвращает объект со списками файлов и папок', () => {
      const parsedSources = separateFoldersAndFiles(sourcesStub.body);
      expect(parsedSources).to.deep.equal(parsedSourcesBodyStub);
    });
  });
});
