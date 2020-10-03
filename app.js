const express = require('express');
const app = express();
require('dotenv').config();
const env = process.env;
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@0000',
  database: 'list_app'
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
app.get('/new', (req, res) => {
	res.render('new.ejs');
});

app.post('/create', (req, res) => {

	connection.query(
	'INSERT INTO items(name) VALUES (?)',
	[req.body.itemName],
	(error, results) => {
		res.redirect('/index');
	});
	});

app.listen(3000);