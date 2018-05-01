var mongoose = require('mongoose');

if (process.env.NODE_ENV == 'production') {
  console.log('connecting to... ' + process.env.NODE_ENV);
  console.log('also connecting to mlab ' + process.env.MLAB_URL);
  mongoose.connect(process.env.MLAB_URL);
} else {
  console.log('this is the local server ');
  mongoose.connect('mongodb://localhost/doodcoin');
}

module.exports.User = require('./users').default;
//module.exports.Strategy = require('./strategies');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//module.exports.Search = require("./strategy");
module.exports.User = require("./user");
