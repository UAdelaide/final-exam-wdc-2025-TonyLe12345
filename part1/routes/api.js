var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/api/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;