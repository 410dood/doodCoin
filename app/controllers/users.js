'use strict';

(function () {
   ...

  function updateHtmlElement(data, element, userProperty) { ... }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
    var userObject = JSON.parse(data);

    updateHtmlElement(userObject, displayName, 'displayName');

    if (profileId !== null) {
      updateHtmlElement(userObject, profileId, 'id');
    }

    if (profileUsername !== null) {
      updateHtmlElement(userObject, profileUsername, 'username');
    }

    if (profileRepos !== null) {
      updateHtmlElement(userObject, profileRepos, 'publicRepos');
    }
  }))
})();



// var db = require('../models'),
//   request = require('request');

// // user profile
// exports.profile = function (req, res) {
//   db.User.findOne({ _id: req.session.userId }, function (err, currentUser) {
//     res.render('profile', { user: currentUser })
//   });
// };

// // // home page
// // exports.home = function (req, res) {
// //   res.render('index', { title: 'Search' });
// // };



// // USERS

// // login
// // exports.signin = function (req, res) {
// //   data = {
// //     title: 'Sign In'
// //   }
// //   res.render('signin', data);
// // };

// // // user login
// // exports.signinUser = function (req, res) {
// //   db.User.findOne({ _id: req.session.userId }, function (err, currentUser) {
// //     res.render('profile', { user: currentUser })
// //   });
// // };

// // // signup
// // exports.signup = function (req, res) {
// //   data = {
// //     title: 'Sign Up'
// //   }
// //   res.render('signup', data);
// // };

// // // user signup
// // exports.signupUser = function (req, res) {
// //   // create user in the db
// //   db.User.createSecure(req.body.name, req.body.email, req.body.password, function (err, signin) {
// //     if (err) {
// //       console.log('Create error: ' + err);
// //       res.sendStatus(500);
// //     }
// //     res.redirect('signin')
// //   });
// // };

// // user profile
// exports.profile = function (req, res) {
//   db.User.findOne({ _id: req.session.userId }, function (err, currentUser) {
//     res.render('profile', { user: currentUser })
//   });
// };