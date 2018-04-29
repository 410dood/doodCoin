// var mongoose = require('mongoose'),
// 	bcrypt = require('bcrypt');

// var Schema = mongoose.Schema;

// var UserSchema = new Schema({
// 	email: String,
// 	passwordDigest: String
// });

// UserSchema.statics.createSecure = function (email, password, callback) {
// 	var UserModel = this;

// 	bcrypt.genSalt(function (err, salt) {
// 		console.log('salt', salt);

// 		bcrypt.hash(password, salt, function (err, hash) {

// 			//once we have a encrypted hash, we can store that in our database
// 			UserModel.create({
// 				email: email,
// 				passwordDigest: hash
// 			}, callback);
// 		});
// 	});
// };

// UserSchema.methods.checkPassword = function (password) {
// 	// return true if the password typed matches the one stored in the DB. 'this' refers to the user document that called this function (from es5)
// 	return bcrypt.compareSync(password, this.passwordDigest);
// };

// // authenticate user (when user logs in)
// UserSchema.statics.authenticate = function (email, password, callback) {
// 	// find user by email entered at log in
// 	// remember `this` refers to the User for methods defined on UserSchema.statics
// 	this.findOne({ email: email }, function (err, foundUser) {
// 		console.log(foundUser);

// 		// throw error if can't find user
// 		if (!foundUser) {
// 			console.log('No user with email ' + email);
// 			callback('Error: no user found', null);  // better error structures are available, but a string is good enough for now
// 			// if we found a user, check if password is correct
// 		} else if (foundUser.checkPassword(password)) {
// 			callback(null, foundUser);
// 		} else {
// 			callback('Error: incorrect password', null);
// 		}
// 	});
// };

// //this line creates the model from the schema
// var User = mongoose.model('User', UserSchema);

// module.exports = User;



var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	passwordDigest: String
});

UserSchema.statics.createSecure = function(email, password, callback){
	var UserModel = this;

	bcrypt.genSalt(function(err, salt){
		console.log('salt', salt);

		bcrypt.hash(password, salt, function(err, hash){

			//once we have a encrypted hash, we can store that in our database
			UserModel.create({
				email: email,
				passwordDigest: hash
			}, callback);
		});
	});
};

UserSchema.methods.checkPassword = function(password) {
	// return true if the password typed matches the one stored in the DB. 'this' refers to the user document that called this function (from es5)
	return bcrypt.compareSync(password, this.passwordDigest);
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
	// find user by email entered at log in
	// remember `this` refers to the User for methods defined on UserSchema.statics
	this.findOne({email: email}, function (err, foundUser) {
		console.log('is this it');
		console.log(foundUser);
		global.USERNAME=foundUser;
		// throw error if can't find user
		if (!foundUser) {
			console.log('No user with email ' + email);
			callback('Error: no user found', null);  // better error structures are available, but a string is good enough for now
			// if we found a user, check if password is correct
		} else if (foundUser.checkPassword(password)) {
			callback(null, foundUser);
		} else {
			callback('Error: incorrect password', null);
		}
	});
};

//this line creates the model from the schema
var User = mongoose.model('User', UserSchema);

module.exports = User;


//////////////////////////////

// const mongoose = require('mongoose');
// const unique = require('mongoose-unique-validator');
// const validate = require('mongoose-validator');

// const nameValidator = [
// 	validate({
// 		validator: 'isLength',
// 		arguments: [0, 40],
// 		message: 'Name must not exceed {ARGS[1]} characters.'
// 	})
// ];

// const emailValidator = [
// 	validate({
// 		validator: 'isLength',
// 		arguments: [0, 40],
// 		message: 'Email must not exceed {ARGS[1]} characters.'
// 	}),
// 	validate({
// 		validator: 'isEmail',
// 		message: 'Email must be valid.'
// 	})
// ];

// const ageValidator = [
// 	// TODO: Make some validations here...
// ];

// const genderValidator = [
// 	// TODO: Make some validations here...
// ];

// // Define the database model
// const UserSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: [true, 'Name is required.'],
// 		validate: nameValidator
// 	},
// 	email: {
// 		type: String,
// 		required: [true, 'Email is required.'],
// 		unique: true,
// 		validate: emailValidator
// 	},
// 	age: {
// 		type: Number,
// 		validate: ageValidator
// 	},
// 	gender: {
// 		type: String,
// 		validate: genderValidator
// 	}
// });

// // Use the unique validator plugin
// UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

// const User = module.exports = mongoose.model('user', UserSchema);
