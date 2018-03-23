function createBreadCumpByPath(path) {
  const pathArray = path.split('/').filter(s => s !== '');
  const breadCumpArray = [
    {
      linkText: '__/',
      link: '',
    },
  ];
  for (let i = 1; i <= pathArray.length; i++) {
    if (pathArray[i - 1]) {
      let elemPath = '';
      for (let y = 0; y < i; y++) {
        elemPath += `${pathArray[y]}/`;
      }
      breadCumpArray.push({
        link: elemPath,
        linkText: `${pathArray[i - 1]}/`,
      });
    }
  }
  return breadCumpArray;
}

module.exports = createBreadCumpByPath;
