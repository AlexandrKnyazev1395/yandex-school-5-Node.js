const express = require('express');

const GitApi = require('../cliTools/GitAPI');

const router = express.Router();

/* GET users listing. */
router.get('/:branch', async (req, res, next) => {
  let { branch } = req.params;
  if (!branch) {
    branch = 'master';
  }
  const gitApi = new GitApi();
  await gitApi.checkoutBranch(branch);
  debugger
  const source = await gitApi.getSources('');
  res.send('respond with a resource');
});

module.exports = router;
