const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  if (req.session.user.role === 'admin') {
    return res.redirect('/owner');
  }

  if (req.session.user.role === 'admin') {
    return res.redirect('/owner');
  }
});

module.exports = router;