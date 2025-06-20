var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/api/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', async (req, res) => {
  const [rows] = await db.query(`
    SELECT bl.BookID, bi.Title, u.Name AS SellerName, bl.SellerID
    FROM BookListings bl
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
  `);
  res.json(rows);
});

module.exports = router;