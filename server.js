'use strict';

var express = require('express');
var	routes = require('./app/routes/index.js');
var	mongoose = require('mongoose');
var	passport = require('passport');
var	session = require('express-session');
var db = 'mongodb://localhost/doodcoin';

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
require('dotenv').config();

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);

} else {

	mongoose.connect(db, function (err) { //db = 'mongodb://localhost/yourdb'
		if (err) {
			console.log(err);
		} else {
			console.log('mongoose connection is successful on: ' + db);
		}
	});
}

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));


app.use(session({
	secret: 'LambChop',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});



