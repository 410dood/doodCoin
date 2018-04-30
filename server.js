
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose')
const path = require('path');
const session = require('express-session');
//const MongoStore   = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const app = express();
const db = require('./app/routes');
const User = require("./app/models/Strategy");
const Place = require('./app/models/user');

//app.use(express.static(path.join(__dirname, 'public')));

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
	//store: new MongoStore({ url: 'mongodb://JP:mom@ds157599.mlab.com:57599/project2' })
}));

 app.use('./app/routes/users', users);
 app.use('./app/routes/strategies', strategies);


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



