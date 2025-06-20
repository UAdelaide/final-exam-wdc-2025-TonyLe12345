const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  if (req.session.user.role === 'walker') {
    return res.redirect('/api/walks');
  }

  if (req.session.user.role === 'owner') {
    return res.redirect('/workspaces/final-exam-wdc-2025-TonyLe12345/part2/public/owner-dashboard.html');
  }
});

module.exports = router;