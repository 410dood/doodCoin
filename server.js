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
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// var db = require('./app/config/database.js').default;
// //var db = "mongodb://localhost/doodcoin";
// var db = mongo.db(process.env.MONGOLAB_URI, {
//   native_parser: true
// });
// mongoose.connect(db.url); 
// // mongoose.Promise = global.Promise;

    var mongoose = require("mongoose");

    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =
      process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      'mongodb://localhost/doodcoin';


    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
      if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
        console.log('Succeeded connected to: ' + uristring);
      }
    });



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

require('./app/config/passport')(passport); // pass passport for configuration

 app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
 app.use('/public', express.static(process.cwd() + '/public'));
 app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/view', express.static(process.cwd() + './views'));



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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(port);
console.log('doodcoin working sorta on port... ' + port);


