const ejsLint = require('ejs-lint');
const express = require('express');
const	app = express();
const	bodyParser = require('body-parser');
const	mongoose = require('mongoose');
const path = require('path');
var favicon = require('serve-favicon');
const logger = require('morgan');
mongoose.Promise = global.Promise;
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require("cookie-parser");
//const User = require('./models/user');
//const ENV = require('./app-env');
const User = require('./app/models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const port = process.env.PORT || 8050;


// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/google-authentication-app');

// Middleware
app.use(cookieParser());
//app.use(expressSession({ secret: 'mySecretKey' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Add session support
app.use(session({
	secret: process.env.SESSION_SECRET || 'default_session_secret',
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
	done(null, userDataFromCookie);
});

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).json({
			message: 'must be logged in to continue',
		});
	}
};

// A secret endpoint accessible only to logged-in users
app.get('/protected', accessProtectionMiddleware, (req, res) => {
	res.json({
		message: 'You have accessed the protected endpoint!',
		yourUserInfo: req.user,
	});
});

// Set up passport strategy
passport.use(new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
		clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
		callbackURL: 'https://doodcoin.herokuapp.com/auth/google/callback',
		scope: ['email'],
	},
	// This is a "verify" function required by all Passport strategies
	(accessToken, refreshToken, profile, cb) => {
		console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
		return cb(null, profile);
	},
));
// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/index.html', session: false }),
	(req, res) => {
		console.log('wooo we authenticated, here is our user object:', req.user);
		// Send the user data back to the browser for now
		res.json(req.user);
		res.redirect('/strategies');
	}
);
app.get('/protected', accessProtectionMiddleware, (req, res) => {
	res.json({
		message: 'You have accessed the protected endpoint!',
		yourUserInfo: req.user,
	});
});

// Start server
const server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});


////////////////////

// // Setting up the Passport Strategies
// const googleClientKey = ENV.GOOGLE_CLIENT_ID;
// const googleClientSecret = ENV.GOOGLE_CLIENT_SECRET;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// // Use the GoogleStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and Google
// //   profile), and invoke a callback with a user object.

// passport.use(new GoogleStrategy({
// 	clientID: googleClientKey,
// 	clientSecret: googleClientSecret,
// 	callbackURL: "http://127.0.0.1:3000/auth/google/callback"
// },
// 	function (accessToken, refreshToken, profile, done) {
// 		//check user table for anyone with a facebook ID of profile.id
// 		User.findOne({
// 			'google.id': profile.id
// 		}, function (err, user) {
// 			if (err) {
// 				return done(err);
// 			}
// 			//No user was found... so create a new user with values from Facebook (all the profile. stuff)
// 			if (!user) {
// 				user = new User({
// 					google: profile
// 				});
// 				user.save(function (err) {
// 					if (err) console.log(err);
// 					return done(err, user);
// 				});
// 			} else {
// 				//found user. Return
// 				return done(err, user);
// 			}
// 		});
// 	}
// ));

// // Finish setting up the Sessions
// passport.serializeUser(function (user, done) {
// 	done(null, user);
// });

// passport.deserializeUser(function (user, done) {
// 	done(null, user);
// });

// // -> Google
// app.get('/auth/google', passport.authenticate('google', { scope: "email" }));

// // <- Google
// app.get('/auth/google/callback',
// 	passport.authenticate('google', {
// 		successRedirect: '/',
// 		failureRedirect: '/'
// 	}));

// // Logout
// app.get("/logout", function (req, res) {
// 	req.logout();
// 	res.redirect("/")
// })

// // Home page
// app.get('/', function (req, res) {
// 	res.render('layout', { user: req.user });
// });

// app.listen(3000);


/////////////////



// mongoose.connect('mongodb://localhost/strategy')
// 	.then(() => console.log('connection succesful'))
// 	.catch((err) => console.error(err));

// var index = require('./app/routes/index');
// var users = require('./app/routes/users');
// var strategies = require('./app/routes/strategies');

// // middleware
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.set('port', process.env.PORT || 3000)


// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())

// app.use(session({
// 	saveUnitialized : true,
// 	resave:true,
// 	secret:'SuperSecretCookie',
// 	cookie:{maxAge:30*60*1000}
// }));
// mongoose.connect('mongodb://localhost/doodCoin');

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/users', users);
// app.use('/strategies', strategies);


// app.get('/', function (req, res) {
// 	//render takes a relative path to whatever directory we designated as having all the view files.
// 	res.render('splash');
// });


// // signup route with placeholder response
// app.get('/signup', function (req, res) {
//   //render takes a relative path to whatever directory we designated as having all the view files.
//   res.render('signup');
// });

// app.get('/home', function (req, res) {
// 	res.render('home');
// });

// //going to get the data from the signup form, hash it, and store in the database
// app.post("/signup", function(req, res){
// 	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
// 		res.json(newUserDocument)
// 	})
// });


// app.get("/profile", function(req, res){
// 	User.findOne({_id : req.session.userId}, function(err, userDocument){
// 		res.render('profile', {user : userDocument})
// 	})
// })

// app.post("/sessions", function(req, res){
// 	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
// 		if (err) console.log("error is " + err)
// 		req.session.userId = existingUserDocument.id
// 		res.json(existingUserDocument)
// 	})
// })

// // login route with placeholder response
// app.get('/login', function (req, res) {
//   res.render('login');
// });

// // login route with placeholder response
// app.get('/strategies', function (req, res) {
// 	res.render('strategies');
// });

// // login route with placeholder response
// app.get('/users', function (req, res) {
// 	res.render('users');
// });

// listen on port 3000
// app.listen(3000, function () {
//   console.log('server started on locahost:3000');
// });

// app.listen(app.get('port'), () => {
// 	console.log(`✅ PORT: ${app.get('port')} 🌟`)
// })


//////



