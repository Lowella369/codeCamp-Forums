const mysql = require('mysql');
const dbConfig = require('../database/config.js');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect();

module.exports = connection;