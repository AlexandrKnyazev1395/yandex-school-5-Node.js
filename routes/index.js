const express = require('express');

const router = express.Router();

const { getBranches } = require('../cliTools/git');

router.get('/', async (req, res, next) => {
  const branches = await getBranches();
  if (!branches.errors.length) {
    res.render('index', {
      title: 'Мой гит',
      section: 'Ветки',
      branches: branches.body,
    });
  } else {
    res.render('error', {
      errorText: branches.errors.join(','),
    });
  }
});

module.exports = router;
