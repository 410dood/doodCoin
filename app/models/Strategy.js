var mongoose = require('mongoose');

var StrategySchema = new mongoose.Schema({
	name: String,
	variables: String,
	currency: String,
	coin: Number,
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Strategy', StrategySchema);
