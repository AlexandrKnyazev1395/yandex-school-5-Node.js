const express = require('express');

const { checkout, getFileContent } = require('../cliTools/git');
//const { getFileContent } = require('../cliTools/files');

const router = express.Router();

/* GET users listing. */
router.get('/:branch/:path', async (req, res, next) => {
  const { branch, path } = req.params;
  if (!path || !branch) {
    res.send('you didn\'t provide the path to file or branch in request');
  }
  res.charset = 'utf8';
  const fileContent = await getFileContent(branch, path);
  if (!fileContent.errors.length) {
    res.render('file', {
      title: 'Мой гит',
      section: `Файл ${path}`,
      fileContent: fileContent.body,
    });
  } else {
    res.render('error', {
      errorText: fileContent.errors.join(','),
    });
  }
});

module.exports = router;
