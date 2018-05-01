// var express = require('express');
// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var Schema = mongoose.Schema;

// var UserSchema = new Schema({
// 	email: String,
// 	passwordDigest : String
// });
var UserSchema = new Schema({
 login: '410dood',
     id: 4041727,
     avatar_url: 'https://avatars2.githubusercontent.com/u/4041727?v=4',
     gravatar_id: '',
     html_url: 'https://github.com/410dood',
     name: 'Bill Doody',
     company: 'Heavydoodyworks',
     blog: 'heavydoodyworks.com',
     location: 'Denver',
     email: 'wdoody@yahoo.com',
     hireable: null,
     bio: null,
     public_repos: 46,
});


// this line creates the model from the schema
var User = mongoose.model('User', UserSchema);

 module.exports = User;