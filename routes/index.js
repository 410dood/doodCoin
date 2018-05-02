var express = require('express'),
    router = express.Router(),
    session = require('express-session');

  controller = require('../controllers/users');

// session
router.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));


module.exports = function (app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('loginMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // google ---------------------------------

  // send to google to do the authentication
  app.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  }

// home page
//router.get('/', controller.home);



// SEARCHES

// // get all searches
// router.get('/searches', controller.getSearches);

// // save search
// router.post('/searches/save', controller.saveSearch);

// // save search
// router.post('/user/searches/save', controller.saveUserSearch);

// // update search page
// router.post('/searches/update', controller.updateSearchPage);

// // update search call
// router.post('/search/update/:id', controller.updateSearch);

// // delete search
// router.post('/searches/delete', controller.deleteSearch);

// // search results
// router.post('/results', controller.results);



// USER

// // login page
// router.get('/signin', controller.signin);

// // user login
// router.post('/signin', controller.signinUser);

// // signup
// router.get('/signup', controller.signup);

// // post user informaiton
// router.post('/signup', controller.signupUser);

// // user profile page
// router.get('/profile', controller.profile);

// // user search page
// router.get('/user/searches', controller.userSearches);

// // post user informaiton
// router.post('/sessions', controller.session);

// // log the user out
// router.get('/signout', controller.signout);



// catch all 404
// router.get('*', controller.fourzerofour);


};
module.exports = router;
