
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt');
var app = express();
var db = require('./app/routes');
var Strategy = require("./app/models/Strategy");
var User = require('./app/models/user');
var session = require('express-session');

var strategies = require('./app/routes/strategies');
app.use('/strategies', strategies);
var users = require('./app/routes/users');
app.use('/users', users);
var index = require('./app/routes/index');


app.set('views', path.join(__dirname, '/views'));


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 30 * 60 * 1000 },
}));
mongoose.connect('mongodb://localhost/doodCoin');
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/users', users);
// app.use('/strategies', strategies);

// login route with placeholder response
app.get('/strategies', function (req, res) {
	res.render('strategies');
});

// login route with placeholder response
app.get('/users', function (req, res) {
	res.render('users');
});

app.get("/profile", function (req, res) {
	User.findOne({ _id: req.session.userId }, function (err, userDocument) {
		res.render('profile', { user: userDocument });
	});
});

// login route with placeholder response
app.get('/login', function (req, res) {
	res.render('login');
});

// signup route with placeholder response
app.get('/', function (req, res) {
  //render takes a relative path to whatever directory we designated as having all the view files.
  res.render('signup');
});
app.get('/home', function (req, res) {
	res.render('home');
});

//create new secure user in database
app.post('/users', function (req, res) {
	User.createSecure(req.body.email, req.body.password, function (err, newUser) {
		res.json(newUser);
		console.log(newUser);
	});
});



//going to get the data from the signup form, hash it, and store in the database
app.post('/signup', function(req, res){
	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
		res.json(newUserDocument);
	});
});



app.post("/sessions", function(req, res){
	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
		console.log('session logged in');
		if (err) console.log("error is " + err);
		req.session.userId = existingUserDocument.id;
		res.json(existingUserDocument);
	});
});



// listen on port 3000
// app.listen(3000, function () {
//   console.log('server started on locahost:3000');
// });

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});


//////



