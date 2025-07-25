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
        WalkRequests.request_id,
        Dogs.name AS dog_name,
        WalkRequests.requested_time,
        WalkRequests.duration_minutes,
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


router.get('/walkers/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        Users.username AS walker_username,
        COUNT(WalkRatings.rating_id) AS total_ratings,
        AVG(WalkRatings.rating) AS average_rating,
        COUNT(WalkRequests.request_id) AS completed_walks
        FROM Users
        LEFT JOIN WalkApplications
        ON Users.user_id = WalkApplications.walker_id
        LEFT JOIN WalkRequests
        ON WalkApplications.request_id = WalkRequests.request_id
        AND WalkRequests.status = 'completed'
        LEFT JOIN WalkRatings
        ON WalkRequests.request_id = WalkRatings.request_id
        WHERE Users.role = 'walker'
        GROUP BY Users.username;
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error Fetching Data' });
  }
});

module.exports = router;