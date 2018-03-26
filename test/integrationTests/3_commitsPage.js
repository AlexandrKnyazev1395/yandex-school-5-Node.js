/* eslint-disable */

const { assert } = require('chai');
const cheerio = require('cheerio');

// указанная здесь ветка обязательно должна существовать в тестовом репозитории
const testBranch = 'master'; 

describe('2. Работа страницы с комитами', () => {
  it('Отображается непустой список комитов', async function() {
    await this.browser.url(`/commits/${testBranch}`);
    const commits = await this.browser.isExisting('.commits-list');
    assert.isOk(commits, 'На странице есть список комитов');
    const commitsListText = await this.browser.getText('.commits-list');
    const isEmptycommitsListText = commitsListText.length > 0;
    assert.isOk(commitsListText, 'Cписок комитов на странице не пустой');
  });
  it('Каждый элемент списка содержит хэш комита c сылкой на исходиники + остальную информацию', async function() {
    this.browser.url(`/commits/${testBranch}`);
    const commitsListElements = await this.browser.getHTML('.commits-list__element');
    let isAllHaveHashAndRest = true;
    for (let i = 0; i < commitsListElements.length; i++) {
      const htmlString = commitsListElements[i];
      const isHaveHashAndRest = checkIfHaveHashAndRest(htmlString);
      if(!isHaveHashAndRest) {
        isAllHaveHashAndRest = false;
        break;
      }
    }
    assert.isOk(isAllHaveHashAndRest, 'все элементы списка содержат хэш комита с ссылкой на исходники + остальную информацию')
  });
});

function checkIfHaveHashAndRest(htmlString) {
  const $ = cheerio.load(htmlString);
  const commitHash = $('li .commits-list__commit-hash').text();
  const commitRest = $('li span.commits-list__commit-rest').text();
  if(!commitHash || !commitRest) {
    return false;
  }
  const commitsSourcesHref = $('li .commits-list__commit-hash').attr('href');
  //ссылка должна содержать хэш комита в виде запроса (?commit='commitHash')
  const isLinkContainCommitHash = new RegExp(`^/sources/.+?commit=${commitHash}.*`).test(commitsSourcesHref);
  if(!isLinkContainCommitHash) {
    return false;
  }
  return true;
}
