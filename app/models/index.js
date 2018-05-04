console.log('hitting models/index.js');

// var express = require('express');
// var session = require('express-session');
// var mongoose = require('mongoose');
// var router = express.Router();


// if (process.env.NODE_ENV == 'production') {
//   console.log('connecting to... ' + process.env.NODE_ENV);
//   console.log('also connecting to mlab ' + process.env.MLAB_URL);
//   mongoose.connect(process.env.MLAB_URL);
// } else {
//   console.log('this is the local server ');
//   mongoose.connect('mongodb://localhost/doodcoin');
// }

// //module.exports.User = require('./users').default;
// //module.exports.Strategy = require('./strategies');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

require('dotenv').load();
    var db = "mongodb://admin:admin@ds037395.mlab.com:37395/doodcoin"



 var mongoose = require("mongoose");


    mongoose.connect(db, function (err, res) {
      if (err) {
        console.log('ERROR connecting to: ' + db + '. ' + err);
      } else {
        console.log('Succeeded connected to: ' + db);
      }
    });






// //module.exports.Search = require("./strategy");
// //module.exports.User = require("./user");
// var Node_ENV = "production";

// var mongoose = require("mongoose");
// if (process.env.NODE_ENV == "production") {
//   console.log("connecting to... " + process.env.NODE_ENV)
//   console.log("also connecting to mlab  " + process.env.MLAB_URL)
//   mongoose.connect(process.env.MLAB_URL)
// } else {
//   console.log("this is the local server ")
//   mongoose.connect("mongodb://localhost/doodcoin");
// }


module.exports.Place = require("./place");
module.exports.User = require("./user");
module.exports.Strategy = require("./strategy");

