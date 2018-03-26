/* eslint-disable */
const { assert } = require('chai');
const cheerio = require('cheerio');

describe('2. Работа главной страницы', () => {
  it('Отображается непустой список веток', async function() {
    this.browser.url('/');
    const branches = await this.browser.isExisting('.branches-list');
    assert.isOk(branches, 'На странице есть список веток');
    const branchesListText = await this.browser.getText('.branches-list');
    const isEmptyBranchesListText = branchesListText.length > 0;
    assert.isOk(branchesListText, 'Cписок веток на странице не пустой');
  });
  it('Каждый элемент списка веток содержит название ветки, ссылку на комиты и ссылку на исходники', async function() {
    this.browser.url('/');
    const branchesListElements = await this.browser.getHTML('.branches-list__element');
    let isAllHaveNameAndLinks = true;
    for (let i = 0; i < branchesListElements.length; i++) {
      const htmlString = branchesListElements[i];
      const isHaveNameAndLinks = checkIfHaveNameAndLinks(htmlString);
      if(!isHaveNameAndLinks) {
        isAllHaveNameAndLinks = false;
        break;
      }
    }
    assert.isOk(isAllHaveNameAndLinks, 'все элементы списка содержат название ветки и ссылки на комиты ветки и исходники ветки')
  });
});

function checkIfHaveNameAndLinks(htmlString) {
  const $ = cheerio.load(htmlString);
  const branchName = $('li .branches-list__branch-name').text();
  if(!branchName) {
    return false;
  }
  const commitsLinkText = $('li a.branches-list__commits-link').text();
  const commitsLinkHref = $('li a.branches-list__commits-link').attr('href');
  const sourcesLinkText = $('li a.branches-list__sources-link').text();
  const sourcesLinkHref = $('li a.branches-list__sources-link').attr('href');
  if(!commitsLinkText || !commitsLinkHref || !sourcesLinkText || !sourcesLinkHref) {
    return false;
  }
  //ссылка должна содержать название ветки после commits/
  const isCommitLinkContainBranchName = new RegExp(`^commits/${branchName}`).test(commitsLinkHref);
  //ссылка должна содержать название ветки после sources/
  const isSourcesLinkContainBranchName = new RegExp(`^sources/${branchName}`).test(sourcesLinkHref);
  if(!isCommitLinkContainBranchName || !isSourcesLinkContainBranchName) {
    return false;
  }
  return true;
}
