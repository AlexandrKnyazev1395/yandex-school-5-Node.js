const { expect } = require('chai');

const { getCommits, parseCommits } = require('../../../cliTools/git/getCommits');

const commitsStub = [
  '40e925b_2018-03-21 16:30:17 +0300_fixed path_Alexandr@mail.ru',
  'e9a5f25_2018-03-21 16:29:46 +0300_added file view_Alexandr@mail.ru',
];

const parsedCommitsStub = [
  {
    hash: '40e925b',
    extraCommitInfo: '2018-03-21 16:30:17 +0300, fixed path, Alexandr@mail.ru',
  },
  {
    hash: 'e9a5f25',
    extraCommitInfo: '2018-03-21 16:29:46 +0300, added file view, Alexandr@mail.ru',
  },
];

const executeCliCommandStub = () => Promise.resolve({
  body: commitsStub,
  errors: [],
});


describe('Получение комитов', () => {
  describe('Функция возвращает верные данные', async () => {
    it('Промис возвращает объект со свойствами body и errors', async () => {
      const commits = await getCommits('master', executeCliCommandStub);
      expect(commits).to.be.an('object').that.has.all.keys('body', 'errors');
    });
    it('В свойстве errors содержится пустой массив', async () => {
      const commits = await getCommits('master', executeCliCommandStub);
      // eslint-disable-next-line
      expect(commits.errors).to.be.an('array').that.is.empty;
    });
    it('В свойстве body содержится массив объектов', async () => {
      const commits = await getCommits('master', executeCliCommandStub);
      const allObjects = commits.body.every(b => typeof b === 'object');
      if (!allObjects) {
        return Promise.reject(new Error('в body не только объекты'));
      }
      return Promise.resolve();
    });
  });

  describe('Парсер работает правильно', () => {
    it('При передаче вывода функции executeCliCommand возвращает массив объектов с хэшами и доп.информацией', () => {
      const parsedCommits = parseCommits(commitsStub);
      expect(parsedCommits).to.deep.equal(parsedCommitsStub);
    });
  });
});
