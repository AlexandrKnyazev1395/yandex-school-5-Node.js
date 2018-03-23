const express = require('express');

const router = express.Router();

const { getBranches } = require('../cliTools/git');

router.get('/', async (req, res) => {
  //const branches = await getBranches();
  //if (!branches.errors.length) {
    res.render('index', {
      title: 'Мой гит',
      section: 'Ветки',
      //branches: branches.body,
      branches: [2, 3, 4],
    });
  /*} else {
    res.render('error', {
      errorText: branches.errors.join(','),
    });
  }*/
});

module.exports = router;
