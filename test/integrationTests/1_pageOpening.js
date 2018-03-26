/* eslint-disable */
const { assert } = require('chai');

describe('1. Открытие страницы', () => {
  it('Title страницы соответствует ожидаемому', function() {
    return this.browser.url('/').getTitle()
      .then((text) => {
        assert.equal(text, 'MyGit');
      });
  });
});
