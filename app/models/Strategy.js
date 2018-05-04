console.log('hitting models/strategy.js')

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var strategySchema = new Schema({
    name: String,
    variables: String,
    currency: String,
    coin: Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('strategy', strategySchema);


var strategy = mongoose.model('Strategy', strategySchema);
//module.exports = mongoose.model('Strategy', StrategySchema);

module.exports = strategy;
