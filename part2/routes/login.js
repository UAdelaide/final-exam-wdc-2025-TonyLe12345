const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = { user_id: rows[0].user_id, username: rows[0].username, role: rows[0].role };
    res.json({ message: 'Login successful', role: rows[0].role });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logOut', function (req, res) {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

router.get('/api/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        Dogs.dog_id,
        Dogs.name AS dog_name,
        Dogs.size,
        Dogs.owner_id,
        Users.username AS owner_username
        FROM
        Dogs
        JOIN
        Users ON Dogs.owner_id = Users.user_id;
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error Fetching Data' });
  }
});

module.exports = router;