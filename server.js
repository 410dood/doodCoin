
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var db = require('./routes');
var User = require('./models/user');
var session = require('express-session');

// var strategies = require('./routes/strategies');
// app.use('/strategies', strategies);
// var users = require('./routes/users');
// app.use('/users', users);
// var index = require('./routes/index');
//app.set('views', path.join(__dirname, '/views'));

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

////////auth///////////

app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname }));

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log('App listening on port ' + port));

// // login route with placeholder response
// app.get('/strategies', function (req, res) {
// 	res.render('strategies');
// });

// login route with placeholder response
app.get('/users', function (req, res) {
	res.render('users');
});
app.get('/profile', function (req, res) {
		res.render('profile');
});

// app.get("/profile", function (req, res) {
// 	User.findOne({ _id: req.session.userId }, function (err, userDocument) {
// 		res.render('profile', { user: userDocument });
// 	});
// });

// // login route with placeholder response
// app.get('/login', function (req, res) {
// 	res.render('login');
// });

// signup route with placeholder response
// app.get('/', function (req, res) {
//   //render takes a relative path to whatever directory we designated as having all the view files.
//   res.render('signup');
// });

// app.get('/home', function (req, res) {
// 	res.render('home');
// });

// //create new secure user in database
// app.post('/users', function (req, res) {
// 	User.createSecure(req.body.email, req.body.password, function (err, newUser) {
// 		res.json(newUser);
// 		console.log(newUser);
// 	});
// });

// //going to get the data from the signup form, hash it, and store in the database
// app.post('/signup', function(req, res){
// 	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
// 		res.json(newUserDocument);
// 	});
// });

// app.post("/sessions", function(req, res){
// 	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
// 		console.log('session logged in');
// 		if (err) console.log("error is " + err);
// 		req.session.userId = existingUserDocument.id;
// 		res.json(existingUserDocument);
// 	});
// });


////////////////////////////   passport   /////////////////////////////////////////

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

//////////////////////////////  FACEBOOK AUTH   /////////////////////////////////////////////

const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '437816833334621';
const FACEBOOK_APP_SECRET = 'ace9988bfd11ad08d003ca3044dd9e50';

passport.use(new FacebookStrategy({
	clientID:  FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "/auth/facebook/callback"
},
	function (accessToken, refreshToken, profile, cb) {
		return cb(null, profile);
	}
));

app.get('/auth/facebook',
	passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/error' }),
	function (req, res) {
		res.redirect('/home');
	});



/*  GITHUB AUTH  */

const GitHubStrategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = '1bc681ddcf899adfd749';
const GITHUB_CLIENT_SECRET = 'c53e4dc6187d61f1516f827dca586b76058df9ff' ;//"your app secret"

passport.use(new GitHubStrategy({
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: "/auth/github/callback"
},
	function (accessToken, refreshToken, profile, cb) {
		console.log(profile);
		console.log(cb);
		console.log(accessToken);
		console.log(refreshToken);
		return cb(null, profile);
	}
));

app.get('/auth/github',
	passport.authenticate('github'));

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/error' }),
	function (req, res) {
		res.redirect('/profile');
	});






// const port = process.env.PORT || 3000;
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});




