const express = require('express');
require('dotenv').config();
const env = process.env;
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));



const connection = mysql.createConnection({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE
});



app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index',(req, res) => {
	connection.query(
		'SELECT * FROM items',
		(error, results) => {
			res.render('index.ejs',{items: results});
		});
});

app.listen(3000);