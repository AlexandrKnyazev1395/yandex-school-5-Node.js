const express = require('express');

const router = express.Router();

const GitAPI = require('../cliTools/GitAPI');

/* GET home page. */
router.get('/', (req, res, next) => {
  const gitAPI = new GitAPI();
  gitAPI.getFiles();
  res.render('index', { title: 'GitPlace' });
});

module.exports = router;
