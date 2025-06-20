const mysql = require('mysql2/promise');

const db = mysql.createPool({
  user: 'root',
  database: 'DogWalkService'
});

module.exports = db;