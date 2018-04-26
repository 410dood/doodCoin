const ejsLint = require('ejs-lint');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const User = require('./app/models/user');
const session = require('express-session');
const index = require('./app/routes/index');
const users = require('./app/routes/users');
const strategies = require('./app/routes/strategies');
var db;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/doodcoin')
	.then(() => console.log('connection succesful'))
	.catch((err) => console.error(err));

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(session({
	saveUnitialized: true,
	resave: true,
	secret:'SuperSecretCookie',
	cookie:{maxAge:30*60*1000}
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/strategies', strategies);




app.get('/', function (req, res) {
	//render takes a relative path to whatever directory we designated as having all the view files.
	res.render('splash');
});


// signup route with placeholder response
app.get('/signup', function (req, res) {
  //render takes a relative path to whatever directory we designated as having all the view files.
  res.render('signup');
});

app.get('/home', function (req, res) {
	res.render('home');
});

//going to get the data from the signup form, hash it, and store in the database
app.post("/signup", function(req, res){
	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
		res.json(newUserDocument)
	})
});
app.get("/profile", function(req, res){
	User.findOne({_id : req.session.userId}, function(err, userDocument){
		res.render('profile', {user : userDocument})
	})
})
app.post("/sessions", function(req, res){
	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
		if (err) console.log("error is " + err)
		req.session.userId = existingUserDocument.id
		res.json(existingUserDocument)
	})
})
// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})


//////



