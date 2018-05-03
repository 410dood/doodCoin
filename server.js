// 'use strict';

// var express = require('express');
// var	routes = require('./app/routes/index.js');
// var	mongoose = require('mongoose');
// var	passport = require('passport');
// var	session = require('express-session');
// var db = 'mongodb://localhost/doodcoin';

// var app = express();
// require('dotenv').load();
// require('./app/config/passport')(passport);
// require('dotenv').config();

// if (process.env.MONGODB_URI) {
// 	mongoose.connect(process.env.MONGODB_URI);

// } else {

// 	mongoose.connect(db, function (err) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('mongoose connection is successful on: ' + db);
// 		}
// 	});
// }

// app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
// app.use('/public', express.static(process.cwd() + '/public'));
// app.use('/common', express.static(process.cwd() + '/app/common'));


// app.use(session({
// 	secret: 'LambChop',
// 	resave: false,
// 	saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// routes(app, passport);

// var port = process.env.PORT || 8080;
// app.listen(port, function () {
// 	console.log('Node.js listening on port ' + port + '...');
// });


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var db = require('./app/config/database.js').default;
var db = "mongodb://admin:admin@ds037395.mlab.com:37395/doodcoin";

//mongoose.connect(db.url); 
mongoose.Promise = global.Promise;


if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);

} else {

	mongoose.connect(db, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('mongoose connection is successful on: ' + db);
		}
	});
}

require('./app/config/passport')(passport); // pass passport for configuration

// comment this stuff so you get it
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); 

// have to have this for passport
app.use(session({
	secret: 'Lambchop', 
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); //use with session for social login i think


require('./app/routes/index.js')(app, passport); // l pass in passport

app.listen(port);
console.log('doodcoin working sorta on port... ' + port);


