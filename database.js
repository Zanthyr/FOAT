const mysql = require('mysql');

exports.inktFormSql = mysql.createConnection({
  host: process.env.INK_HOST,
  user: process.env.INK_USER,
  password: process.env.INK_PASSWORD,
  database: process.env.INK_DB
});
