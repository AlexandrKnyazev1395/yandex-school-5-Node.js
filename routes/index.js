const express = require('express');

const router = express.Router();

const { getBranches } = require('../cliTools/git');

router.get('/', async (req, res, next) => {
  const branches = await getBranches();
  //  const sources = await gitAPI.getSources();
  if (!branches.errors.length) {
    res.render('index', {
      title: 'My git',
      section: 'Branches',
      branches: branches.body,
    });
  } else {
    res.render('error', {
      title: 'My git',
      section: 'Branches',
      errors: branches.errors,
    });
  }
});

module.exports = router;
