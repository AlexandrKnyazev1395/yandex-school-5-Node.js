const express = require('express');

const router = express.Router();

const GitAPI = require('../cliTools/GitAPI');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const gitAPI = new GitAPI();
  const branches = await gitAPI.getBranches();
  //  const sources = await gitAPI.getSources();
  if (!branches.errors.length) {
    res.render('index', {
      title: 'My git sources',
      section: 'Branches',
      branches: branches.body,
    });
  } else {
    res.render('index', {
      title: 'My git sources',
      section: 'Branches',
      errors: branches.errors
    });
  }
  
  
});

module.exports = router;
