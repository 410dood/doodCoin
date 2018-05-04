console.log('hitting models/user.js');


var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    github: {
        id: String,
        avatar_url: String,
        url: String,
        token: String,
        name: String,
        username: String,
        email: String,
        public_repos: Number,
        public_gists: Number,
        followers: Number,
        following: Number
    },
    twitter: {
        id: String,
        token: String,
        name: String,
        followers_count: Number,
        friends_count: Number,
        screen_name: String,
        favourites_count: Number,
        photo: String
    }

});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

// 'use strict';

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var User = new Schema({
//     github: {
//         id: String,
//         displayName: String,
//         username: String,
//         publicRepos: Number
//     },
//     nbrClicks: {
//         clicks: Number
//     }
// });

// module.exports = mongoose.model('User', User);


// var bcrypt = require('bcrypt-nodejs');

// // define the schema for our user model
// var userSchema = mongoose.Schema({

//     local: {
//         email: String,
//         password: String,
//     },
//     github: {
//         id: String,
//         token: String,
//         email: String,
//         name: String
//     }
// });

// // generating a hash
// userSchema.methods.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// // create the model for users and expose it to our app
// module.exports = mongoose.model('User', userSchema);



// // var express = require('express');
// // var mongoose = require('mongoose');
// // var bcrypt = require('bcrypt');
// // var Schema = mongoose.Schema;

// // var UserSchema = new Schema({
// // 	email: String,
// // 	passwordDigest : String
// // });
// var UserSchema = new Schema({
//  login: '410dood',
//      id: 4041727,
//      avatar_url: 'https://avatars2.githubusercontent.com/u/4041727?v=4',
//      gravatar_id: '',
//      html_url: 'https://github.com/410dood',
//      name: 'Bill Doody',
//      company: 'Heavydoodyworks',
//      blog: 'heavydoodyworks.com',
//      location: 'Denver',
//      email: 'wdoody@yahoo.com',
//      hireable: null,
//      bio: null,
//      public_repos: 46,
// });


// // this line creates the model from the schema
// var User = mongoose.model('User', UserSchema);

//  module.exports = User;


// const bcrypt = require('bcrypt-nodejs');
// const crypto = require('crypto');
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: { type: String, unique: true },
//     password: String,
//     passwordResetToken: String,
//     passwordResetExpires: Date,


//     profile: {
//         name: String,
//         gender: String,
//         location: String,
//         website: String,
//         picture: String
//     }
// }, { timestamps: true });

// /**
//  * Password hash middleware.
//  */
// userSchema.pre('save', function save(next) {
//     const user = this;
//     if (!user.isModified('password')) { return next(); }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) { return next(err); }
//         bcrypt.hash(user.password, salt, null, (err, hash) => {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });

// /**
//  * Helper method for validating user's password.
//  */
// userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         cb(err, isMatch);
//     });
// };

// /**
//  * Helper method for getting user's gravatar.
//  */
// userSchema.methods.gravatar = function gravatar(size) {
//     if (!size) {
//         size = 200;
//     }
//     if (!this.email) {
//         return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//     }
//     const md5 = crypto.createHash('md5').update(this.email).digest('hex');
//     return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;