var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/api/dogs', async (req, res) => {
  const [rows] = await db.query(`
    SELECT
        Dogs.name,
        Dogs.size,
        Users.username AS owner_username
    FROM
        Dogs
    JOIN
        Users ON Dogs.owner_id = Users.user_id;

  `);
  res.json(rows);
});

module.exports = router;