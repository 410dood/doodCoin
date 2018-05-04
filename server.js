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


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./app/models');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// comment this stuff so you get it
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'LambChop',
  cookie: {
    maxAge: 30 * 60 * 1000
  },
}));
var index = require('./app/routes/index');
var users = require('./app/routes/users');
var strategies = require('./app/routes/strategies');


//var db = require('./app/config/database.js');

// console.log(process.env);

//   if (process.env.NODE_ENV == "production") {
//     console.log("connecting to... " + process.env.NODE_ENV)
//     console.log("also connecting to mlab  " + process.env.MONGODB_URI)
//     mongoose.connect(process.env.MONGODB_URI)
//   } else {
//     console.log("this is the local server ")
//     mongoose.connect("mongodb://localhost/doodcoin");
//   };



    // var db =
    //   process.env.MONGOLAB_URI ||
    //   process.env.MONGODB_URL ||
    //   'mongodb://localhost/doodcoin';


    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    // mongoose.connect(db, function (err, res) {
    //   if (err) {
    //     console.log('ERROR connecting to: ' + db + '. ' + err);
    //   } else {
    //     console.log('Succeeded connected to: ' + db);
    //   }
    // });

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




app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); //use with session for social login i think


require('./app/routes/index.js')(app, passport); // l pass in passport

/////neeed this/////
app.use(require('./app/routes'));



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


// app.listen(PORT, () => { 
//   console.log(`Server is listening on port ${PORT}`);
// });

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});



