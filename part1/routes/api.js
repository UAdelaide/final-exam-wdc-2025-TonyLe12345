var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        Dogs.name AS dog_name,
        Dogs.size,
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

router.get('/walkrequests/open', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        Dogs.name AS dog_name,
        WalkRequests.requested_time,
        WalkRequests.location,
        Users.username AS owner_username
        FROM WalkRequests
        JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
        JOIN Users ON Dogs.owner_id = Users.user_id
        WHERE WalkRequests.status = 'open';
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error Fetching Data' });
  }
});


router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        Dogs.name AS dog_name,
        Dogs.size,
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