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
  await checkout(destination);
  const sources = await getSources(destination, path);
  res.render('sources', {
    title: 'My git',
    section: 'Sources',
    folders: sources.body.folders,
    files: sources.body.files,
    branch,
  });
});

module.exports = router;
