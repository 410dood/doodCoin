
// // module.exports = {

// //     'url': 'mongodb://localhost/doodcoin'

// // };
// var mongoose = require("mongoose");



module.exports = {

if (process.env.NODE_ENV == "production") {
    console.log("connecting to... " + process.env.NODE_ENV)
    console.log("also connecting to mlab  " + process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI)
} else {
    console.log("this is the local server ")
    mongoose.connect("mongodb://localhost/doodcoin");
    }
};

// module.exports.Auth = require("./auth");
// module.exports.Passport = require("./passport");
// module.exports.User = require("../models/user");
// module.exports.Strategy = require("../models/Strategy");

