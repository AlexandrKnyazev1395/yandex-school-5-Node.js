const express = require('express');

const { checkout, getSources } = require('../cliTools/git');

const router = express.Router();

router.get('/:branch', async (req, res, next) => {
  const { branch } = req.params;
  const { commit, path } = req.query;
  let destination;
  if (commit) {
    destination = commit;
  } else {
    destination = branch;
  }
  const sources = await getSources(destination, path);
  if (!sources.errors.length) { 
    res.render('sources', {
      title: 'Мой гит',
      section: 'Исходники',
      folders: sources.body.folders,
      files: sources.body.files,
      branch,
      commit,
    });
  } else {
    res.render('error', {
      errorText: sources.errors.join(','),
    });
  }
});

module.exports = router;
