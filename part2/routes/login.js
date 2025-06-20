const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  if (req.session.user.role === 'walk') {
    return res.redirect('/api/walks');
  }

  if (req.session.user.role === 'users') {
    return res.redirect('/api/users');
  }
});

module.exports = router;