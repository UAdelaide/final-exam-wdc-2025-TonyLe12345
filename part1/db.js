const mysql = require('mysql2/promise');

const db = mysql.createPool({
  user: 'root',
  password: 'newpassword',
  database: 'textbook_marketplace'
});

module.exports = db;