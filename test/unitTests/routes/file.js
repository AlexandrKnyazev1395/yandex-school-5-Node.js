const { expect } = require('chai');
const sinon = require('sinon');

const { getFilePage } = require('../../../routes/file');

describe('Отправка пользователю контента файла при запросе на route file/...', () => {
  it('Возвращает пользователю ошибку при неправильном запросе', async () => {
    const req = { 
      params: {},
      query: {},
    };
    const res = {
      send: sinon.spy(),
    };

    await getFilePage(req, res);
    expect(res.send.firstCall.args[0]).to.equal('you didn\'t provide the path to file or branch in request');
  });
});
