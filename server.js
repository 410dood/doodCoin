// include modules
require('dotenv').config(); // loads the .env
const bodyParser = require('body-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('./config/passportConfig');
const path = require('path');
const session = require('express-session');
const db = require('./models');
const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

// initialize app
const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/doodcoin');

/* error logger, static routes */
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// set and use statements. set view engine and use middleware.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// just a convenience, but makes life easier...
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

// top-level routes
app.get('/', (req, res) => {
	res.render('home')
});

// include any routes from controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/StrategyController', require('./controllers/profile'))

/* Error Handling */
app.get('*', function (req, res) {
	res.status(404).send('This is not the page you are looking for')
});

/* Listen on PORT */
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
	console.log(`Listening on port: ${app.get('port')}`)
})

//////////////////////////






// var express = require('express'),
// 	app = express(),
// 	bodyParser = require('body-parser'),
// 	mongoose = require('mongoose');
// db = require('models');
// const session = require('express-session');


// /////middleware
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(session({
// 	saveUninitialized: true,
// 	resave: true,
// 	secret: 'SuperSecretCookie',
// 	cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
// }));







// const path = require('path');
// const cookieParser = require('cookie-parser');
// const User = require('./app/models/user');
// const users = require('./app/routes/users');
// const strategies = require('./app/routes/strategies');
// var db;
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/doodcoin')
// 	.then(() => console.log('doodcoin connection succesful'))
// 	.catch((err) => console.error(err));

// // middleware
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.set('port', process.env.PORT || 3000);

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(session({
// 	saveUnitialized: true,
// 	resave: true,
// 	secret:'lambchop',
// 	cookie:{maxAge:30*60*1000}
// }));

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
// 	//render takes a relative path to whatever directory we designated as having all the view files.
// 	res.render('signup');
// });

// app.get('/home', function (req, res) {
// 	res.render('home');
// });

// //going to get the data from the signup form, hash it, and store in the database
// app.post('/signup', function(req, res){
// 	User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
// 		console.log(newUserDocument)
// 		res.json(newUserDocument);
// 	});
// });
// app.get('/profile', function(req, res){
// 	User.findOne({_id : req.session.userId}, function(err, userDocument){
// 		res.render('profile', {user : userDocument});
// 	});
// });
// app.post('/sessions', function(req, res){
// 	User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
// 		if (err) console.log('error is ' + err);
// 		req.session.userId = existingUserDocument.id;
// 		res.json(existingUserDocument);
// 	});
// });
// // login route with placeholder response
// app.get('/login', function (req, res) {
// 	res.render('login');
// });

// app.listen(app.get('port'), () => {
// 	console.log(`✅ PORT: ${app.get('port')} 🌟`);
// });


////////


// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
// 	saveUnitialized: true,
// 	resave: true,
// 	secret: 'SuperSecretCookie',
// 	cookie: { maxAge: 30 * 60 * 1000 }
// }));
// mongoose.connect('mongodb://localhost/simple-login');


// // signup route with placeholder response
// app.get('/signup', function (req, res) {
// 	//render takes a relative path to whatever directory we designated as having all the view files.
// 	res.render('signup');
// });

// app.get('/home', function (req, res) {
// 	res.render('home');
// });


// //going to get the data from the signup form, hash it, and store in the database
// app.post("/signup", function (req, res) {
// 	User.createSecure(req.body.email, req.body.password, function (err, newUserDocument) {
// 		res.json(newUserDocument)
// 	})
// });

// app.get("/profile", function (req, res) {
// 	User.findOne({ _id: req.session.userId }, function (err, userDocument) {
// 		res.render('profile', { user: userDocument })
// 	})
// })

// app.post("/sessions", function (req, res) {
// 	User.authenticate(req.body.email, req.body.password, function (err, existingUserDocument) {
// 		if (err) console.log("error is " + err)
// 		req.session.userId = existingUserDocument.id
// 		res.json(existingUserDocument)
// 	})
// })

// // login route with placeholder response
// app.get('/login', function (req, res) {
// 	res.render('login');
// });

// // listen on port 3000
// app.listen(3000, function () {
// 	console.log('server started on locahost:3000');
// });




//////



// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const socket = require('socket.io');

// const config = require('./config/db');

// // Use Node's default promise instead of Mongoose's promise library
// mongoose.Promise = global.Promise;

// // Connect to the database
// mongoose.connect(config.db);
// let db = mongoose.connection;

// db.on('open', () => {
// 	console.log('Connected to the database.');
// });

// db.on('error', (err) => {
// 	console.log(`Database error: ${err}`);
// });

// // Instantiate express
// const app = express();

// // Don't touch this if you don't know it
// // We are using this for the express-rate-limit middleware
// // See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');

// // Set public folder using built-in express.static middleware
// app.use(express.static('public'));

// // Set body parser middleware
// app.use(bodyParser.json());

// // Enable cross-origin access through the CORS middleware
// // NOTICE: For React development server only!
// if (process.env.CORS) {
// 	app.use(cors());
// }

// // Initialize routes middleware
// app.use('/api/users', require('./routes/users'));

// // Use express's default error handling middleware
// app.use((err, req, res, next) => {
// 	if (res.headersSent) return next(err);
// 	res.status(400).json({ err: err });
// });

// // Start the server
// const port = process.env.PORT || 3000;

// const server = app.listen(port, () => {
// 	console.log(`Listening on port ${port}`);
// });

// // Set up socket.io
// const io = socket(server);
// let online = 0;

// io.on('connection', (socket) => {
// 	online++;
// 	console.log(`Socket ${socket.id} connected.`);
// 	console.log(`Online: ${online}`);
// 	io.emit('visitor enters', online);

// 	socket.on('add', data => socket.broadcast.emit('add', data));
// 	socket.on('update', data => socket.broadcast.emit('update', data));
// 	socket.on('delete', data => socket.broadcast.emit('delete', data));

// 	socket.on('disconnect', () => {
// 		online--;
// 		console.log(`Socket ${socket.id} disconnected.`);
// 		console.log(`Online: ${online}`);
// 		io.emit('visitor exits', online);
// 	});
// });



//////////////////////////


// var express = require('express'),
// 	app = express(),
// 	path = require('path'),
// 	http = require('http').Server(app),
// 	io = require('socket.io')(http),
// 	feed = require('./scripts/feed');

// app.use(express.static(path.join(__dirname, './www')));

// io.on('connection', function (socket) {
// 	console.log('User connected. Socket id %s', socket.id);

// 	socket.on('join', function (rooms) {
// 		console.log('Socket %s subscribed to %s', socket.id, rooms);
// 		if (Array.isArray(rooms)) {
// 			rooms.forEach(function (room) {
// 				socket.join(room);
// 			});
// 		} else {
// 			socket.join(rooms);
// 		}
// 	});

// 	socket.on('leave', function (rooms) {
// 		console.log('Socket %s unsubscribed from %s', socket.id, rooms);
// 		if (Array.isArray(rooms)) {
// 			rooms.forEach(function (room) {
// 				socket.leave(room);
// 			});
// 		} else {
// 			socket.leave(rooms);
// 		}
// 	});

// 	socket.on('disconnect', function () {
// 		console.log('User disconnected. %s. Socket id %s', socket.id);
// 	});
// });

// feed.start(function (room, type, message) {
// 	io.to(room).emit(type, message);
// });

// http.listen(3000, function () {
// 	console.log('listening on: 3000');
// });