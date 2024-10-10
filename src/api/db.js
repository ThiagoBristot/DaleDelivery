const mysql = require('mysql2/promise');
const fs = require('fs');

const pool = mysql.createPool({
  host: 'delivrae.cpwe4yyg0wfm.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Laralinda1L',
  database: 'foodservice', 
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = pool; 
