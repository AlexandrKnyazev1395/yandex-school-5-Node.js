const express = require('express');

const { getFileContent } = require('../cliTools/git');
const { createBreadCumpByPath } = require('../utils');

const router = express.Router();

/* GET users listing. */
router.get('/:branch/', async (req, res) => {
  const { branch } = req.params;
  const { path } = req.query;
  const pathBreadCump = createBreadCumpByPath(path || '/');
  if (!path || !branch) {
    res.send('you didn\'t provide the path to file or branch in request');
  }
  res.charset = 'utf8';
  const fileContent = await getFileContent(branch, path || '/');
  if (!fileContent.errors.length) {
    res.render('file', {
      title: 'Мой гит',
      section: 'Файл',
      fileContent: fileContent.body,
      pathBreadCump,
      branch,
    });
  } else {
    res.render('error', {
      errorText: fileContent.errors.join(','),
    });
  }
});

module.exports = router;
