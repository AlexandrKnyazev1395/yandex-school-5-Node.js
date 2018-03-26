/* eslint-disable */

const { assert } = require('chai');
const cheerio = require('cheerio');
const { URL }  = require('url');

// указанная здесь ветка обязательно должна существовать в тестовом репозитории
const testBranch = 'master'; 

describe('2. Работа страницы с исходниками', () => {
  it('Отображается непустой список исходников', async function() {
    await this.browser.url(`/sources/${testBranch}`);
    const commits = await this.browser.isExisting('.sources-list');
    assert.isOk(commits, 'На странице есть список исходников');
    const commitsListText = await this.browser.getText('.sources-list');
    const isEmptycommitsListText = commitsListText.length > 0;
    assert.isOk(commitsListText, 'Cписок исходников на странице не пустой');
  });

  it('Элементы списка - ссылки либо на исходники либо на просмотр файла', async function() {
    this.browser.url(`/sources/${testBranch}`);
    const sourcesListElements = await this.browser.getHTML('.sources-list__element');
    let isAllHaveLink = true;
    for (let i = 0; i < sourcesListElements.length; i++) {
      const htmlString = sourcesListElements[i];
      const isHaveLink = checkIfHaveLink(htmlString);
      if(!isHaveLink) {
        isAllHaveLink = false;
        break;
      }
    }
    assert.isOk(isAllHaveLink, 'все элементы списка содержат ссылку на исходники или на файл');
  });

  it('Отображается элемент "хлебная крошка"', async function() {
    this.browser.url(`/sources/${testBranch}`);
    const commits = await this.browser.isExisting('.breadcump');
    assert.isOk(commits, 'На странице есть элемент "хлебная крошка"');
  });

  it('Работает переход в папки', async function() {
    await this.browser.url(`/sources/${testBranch}`);
    await this.browser.click('.sources-list__element:first-child a');
    const url = await this.browser.getUrl();
    const isFolderURL = checkIfFolderURL(url);
    assert.isOk(isFolderURL, 'Открылась страница просмотра папки');
  });
  

  it('Хлебная крошка работает корректно', async function() {
    const defaultUrl = '/sources/master?path=client/scripts/';
    const doubleBackUrl = '/sources/master?path=';
    await this.browser.url(`/sources/master?path=client/scripts/`);
    await this.browser.click('.breadcump a:first-child'); //кликаем на начало хлебной крошки
    let currentBrowserUrl =  new URL(await this.browser.getUrl());
    const pathnamePlusSearch = currentBrowserUrl.pathname + currentBrowserUrl.search;
    const isDoubleBackRight = pathnamePlusSearch === doubleBackUrl;
  });
});

/**
  если это url папки - он должен содержать непустой запрос path
    и включать source
 */
function checkIfFolderURL(url) {
  const pathname = new URL(url).pathname;
  const search = new URL(url).search;
  const startWithSource = /^\/sources\//;
  const startWithPath = /\?path=/;
  return startWithSource.test(pathname) && startWithPath.test(search) ;
}

function checkIfHaveLink(htmlString) {
  const $ = cheerio.load(htmlString);
  const link = $('li a').text();
  if(!link) {
    return false;
  }
  const linkText = $('li a').attr('href');
  if(!linkText) {
    return false;
  }
  const isLinkToSource = new RegExp(`^/sources/.*`).test(linkText);
  const isLinkToFile = new RegExp(`^/file/*`).test(linkText);
  if(!isLinkToFile && !isLinkToSource) {
    return false;
  }
  return true;
}

