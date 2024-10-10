const mysql = require('mysql2/promise');
const fs = require('fs');

const pool = mysql.createPool({
  host: 'delivrae.cpwe4yyg0wfm.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Laralinda1L',
  database: 'foodservice', 
  waitForConnections: true,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./us-east-1-bundle.pem') // Caminho para o certificado
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = pool; 
