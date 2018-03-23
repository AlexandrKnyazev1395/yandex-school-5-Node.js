const express = require('express');

const { getSources } = require('../cliTools/git');
const { createBreadCumpByPath } = require('../utils');

const router = express.Router();

router.get('/:branch', async (req, res) => {
  const { branch } = req.params;
  const { commit, path } = req.query;
  let destination;
  const pathBreadCump = createBreadCumpByPath(path || '/');
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
      destination,
      commit,
      pathBreadCump,
    });
  } else {
    res.render('error', {
      errorText: sources.errors.join(','),
    });
  }
});

module.exports = router;
