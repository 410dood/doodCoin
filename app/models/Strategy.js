var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StrategySchema = new Schema({
	name: String,
	variables: String,
	currency: String,
	coin: Number,
	updated_at: { type: Date, default: Date.now }
});


var Strategy =mongoose.model('Strategy', StrategySchema);
//module.exports = mongoose.model('Strategy', StrategySchema);

module.exports = Strategy;
