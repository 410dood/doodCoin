console.log('strategies.js page loaded');

var express = require('express');
var router = express.Router();
var strategy = require('../controllers/StrategyController.js');

// Get all strategies
router.get('/', function(req, res) {
	strategy.list(req, res);
});

// Get single strategy by id
router.get('/show/:id', function(req, res) {
	strategy.show(req, res);
});

// Create strategy
router.get('/create', function(req, res) {
	strategy.create(req, res);
});

// Save strategy
router.post('/save', function(req, res) {
	strategy.save(req, res);
});

// Edit strategy
router.get('/edit/:id', function(req, res) {
	strategy.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
	strategy.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
	strategy.delete(req, res);
});

module.exports = router;
