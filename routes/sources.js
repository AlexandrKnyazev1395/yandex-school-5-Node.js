const express = require('express');

const { checkoutToBranch, getSources } = require('../cliTools/git');

const router = express.Router();

router.get('/:branch', async (req, res, next) => {
  let { branch } = req.params;
  if (!branch) {
    branch = 'master';
  }
  await checkoutToBranch(branch);
  const sources = await getSources();
  res.render('sources', {
    title: 'My git',
    section: 'Sources',
    sources: sources.body,
  });
});

module.exports = router;
