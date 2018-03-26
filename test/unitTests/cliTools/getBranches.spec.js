const { expect } = require('chai');

const { getBranches, parseBranches } = require('../../../cliTools/git/getBranches');

const branchesStub = ['* master', ' branchName1 ', 'branchName2   '];

const executeCliCommandStub = () => Promise.resolve({
  body: branchesStub,
  errors: [],
});


describe('Получение веток', () => {
  describe('Функция возвращает верные данные', async () => {
    it('Промис возвращает объект со свойствами body и errors', async () => {
      const branches = await getBranches(executeCliCommandStub);
      expect(branches).to.be.an('object').that.has.all.keys('body', 'errors');
    });
    it('В свойстве errors содержится пустой массив', async () => {
      const branches = await getBranches(executeCliCommandStub);
      // eslint-disable-next-line
      expect(branches.errors).to.be.an('array').that.is.empty;
    });
    it('В свойстве body содержится массив строк (git-веток)', async () => {
      const branches = await getBranches(executeCliCommandStub);
      const allStrings = branches.body.every(b => typeof b === 'string');
      if (!allStrings) {
        return Promise.reject(new Error('в body не только строки'));
      }
      return Promise.resolve();
    });
  });

  describe('Парсер работает правильно', () => {
    it('При передаче вывода функции executeCliCommand возвращает названия веток без лишних символов', () => {
      const parsedBranches = parseBranches(branchesStub);
      expect(parsedBranches).to.deep.equal(['master', 'branchName1', 'branchName2']);
    });
  });
});
