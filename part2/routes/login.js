const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  if (req.session.user.role === 'walker') {
    return res.redirect('/walker-dashboard.html');
  }

  if (req.session.user.role === 'owner') {
    return res.redirect('/owner-dashboard.html');
  }
});

module.exports = router;