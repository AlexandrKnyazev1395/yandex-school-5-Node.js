const express = require('express');

const { getFileContent } = require('../cliTools/git');

const router = express.Router();

/* GET users listing. */
router.get('/:branch/:path', async (req, res) => {
  const { branch, path } = req.params;
  const normalizePath = path.replace(/-/g, '/');
  if (!path || !branch) {
    res.send('you didn\'t provide the path to file or branch in request');
  }
  res.charset = 'utf8';
  const fileContent = await getFileContent(branch, normalizePath);
  if (!fileContent.errors.length) {
    res.render('file', {
      title: 'Мой гит',
      section: `Файл ${normalizePath}`,
      fileContent: fileContent.body,
    });
  } else {
    res.render('error', {
      errorText: fileContent.errors.join(','),
    });
  }
});

module.exports = router;
