const express = require('express');

const { checkoutToBranch, getCommits } = require('../cliTools/git');

const router = express.Router();

/* GET users listing. */
router.get('/:branch', async (req, res, next) => {
  let { branch } = req.params;
  if (!branch) {
    branch = 'master';
  }
  await checkoutToBranch(branch);
  const commits = await getCommits();
  res.render('commits', {
    title: 'My git',
    section: 'Sources',
    commits: commits.body,
    branch,
  });
});

module.exports = router;
