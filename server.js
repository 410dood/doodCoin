const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
mongoose.Promise = global.Promise;

var User = require('./app/models/user')
var session = require('express-session')

mongoose.connect('mongodb://localhost/strategy')
	.then(() => console.log('connection succesful'))
	.catch((err) => console.error(err));

var index = require('./app/routes/index');
var users = require('./app/routes/users');
var strategies = require('./app/routes/strategies');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000)


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(session({
	saveUnitialized : true,
	resave:true,
	secret:'SuperSecretCookie',
	cookie:{maxAge:30*60*1000}
}));
mongoose.connect('mongodb://localhost/doodCoin');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/strategies', strategies);


// app.get('/', function (req, res) {
// 	//render takes a relative path to whatever directory we designated as having all the view files.
// 	res.render('splash');
// });


// signup route with placeholder response
app.get('/', function (req, res) {
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


// listen on port 3000
// app.listen(3000, function () {
//   console.log('server started on locahost:3000');
// });

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})


//////



