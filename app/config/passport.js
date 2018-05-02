
console.log('hitting config/passport.js');

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /////////////////// FACEBOOK  ///////////////////

    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true; //this lets me pass to route
    passport.use(new FacebookStrategy(fbStrategy,
        function (req, token, refreshToken, profile, done) {

            var apiPath = '/me/friends';

            process.nextTick(function () {

                User.findOne({
                    'facebook.id': profile.id
                }, function (err, user) {

                    // if error, send sback
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        //make user if non found
                        var newUser = new User();

                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // save the token                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // how names are retun...strange

                        if (profile.hasOwnProperty('email')) {

                            newUser.facebook.email = '';
                        } else {

                            newUser.facebook.email = profile.emails[0].value; //takes firstr email from fb cause it will send all attached
                        }
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

    ///////////////////  GOOGLE ///////////////////

    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },
        function (token, refreshToken, profile, done) {

            //wait till get info back from google
            process.nextTick(function () {

                // see if person already in db
                User.findOne({
                    'google.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull first email

                        // save them
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));

    var githubStrategy = configAuth.githubAuth;
    passport.use(new GithubStrategy({
        clientID: githubStrategy.clientID,
        clientSecret: githubStrategy.clientSecret,
        callbackURL: githubStrategy.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {


            process.nextTick(function () {

                User.findOne({
                    'github.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.github.id = profile.id;
                        newUser.github.token = accessToken;
                        newUser.github.name = profile.displayName;
                        newUser.github.username = profile.username;
                        newUser.github.email = profile.emails[0].value;
                        newUser.github.public_repos = profile._json.public_repos;
                        newUser.github.public_gists = profile._json.public_gists;
                        newUser.github.followers = profile._json.followers;
                        newUser.github.following = profile._json.following;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    var twitterStrategy = configAuth.twitterAuth;
    passport.use(new TwitterStrategy({
        consumerKey: twitterStrategy.consumerKey,
        consumerSecret: twitterStrategy.consumerSecret,
        callbackURL: twitterStrategy.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {

            User.findOne({
                'twitter.id': profile.id
            }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (!err && user !== null) {
                    done(null, user);
                } else {
                    newUser = new User();

                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = accessToken;
                    newUser.twitter.name = profile._json.name;
                    newUser.twitter.followers_count = profile._json.followers_count;
                    newUser.twitter.friends_count = profile._json.friends_count;
                    newUser.twitter.screen_name = profile._json.screen_name;
                    newUser.twitter.favourites_count = profile._json.favourites_count;
                    newUser.twitter.photo = profile.photos[0].value;

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        } else {
                            done(null, user);
                        }
                    });
                }
            });
        }
    ));

    // var instagramStrategy = configAuth.instagramAuth;
    // passport.use(new InstagramStrategy({
    //       clientID: instagramStrategy.clientID,
    //       clientSecret: instagramStrategy.clientSecret,
    //       callbackURL: instagramStrategy.callbackURL
    //    },
    //    function(accessToken, refreshToken, profile, done) {

    //       process.nextTick(function() {
    //          return done(null, profile);
    //       });
    //    }
    // ));
};