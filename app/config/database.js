var mongoose = require("mongoose");
if (process.env.NODE_ENV == "production") {
    console.log("connecting to... " + process.env.NODE_ENV)
    console.log("also connecting to mlab  " + process.env.MLAB_URL)
    mongoose.connect(process.env.MLAB_URL)
} else {
    console.log("this is the local server ")
    mongoose.connect("mongodb://localhost/doodcoin");
}


module.exports.Auth = require("./auth");
module.exports.Passport = require("./passport");
module.exports.User = require("../models/user");