const express = require('express');

const { getCommits } = require('../cliTools/git');

const router = express.Router();

/* GET users listing. */
router.get('/:branch', async (req, res, next) => {
  let { branch } = req.params;
  if (!branch) {
    branch = 'master';
  }
  const commits = await getCommits(branch);
  if (!commits.errors.length) {
    res.render('commits', {
      title: 'Мой гит',
      section: 'Комиты',
      commits: commits.body,
      branch,
    });
  } else {
    res.render('error', {
      errorText: commits.errors.join(','),
    });
  }
});

module.exports = router;
