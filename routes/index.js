var express = require('express'),
  router = express.Router(),
  controller = require('../controllers');

// session
router.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));


// home page
router.get('/', controller.home);



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

// login page
router.get('/signin', controller.signin);

// user login
router.post('/signin', controller.signinUser);

// signup
router.get('/signup', controller.signup);

// post user informaiton
router.post('/signup', controller.signupUser);

// user profile page
router.get('/profile', controller.profile);

// user search page
router.get('/user/searches', controller.userSearches);

// post user informaiton
router.post('/sessions', controller.session);

// log the user out
router.get('/signout', controller.signout);



// catch all 404
router.get('*', controller.fourzerofour);



module.exports = router;