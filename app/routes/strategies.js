console.log('hitting route/strategies');

var express = require('express');
var router = express.Router();
var strategy = require('../controllers/strategyController.js');


// Get all strategies
router.get('/', function (req, res) {
    strategy.list(req, res);
});

// Get single strategy by id
router.get('/show/:id', function (req, res) {
    strategy.show(req, res);
});

// Create strategy
router.get('/create', function (req, res) {
    strategy.create(req, res);
});

// Save strategy
router.post('/save', function (req, res) {
    strategy.save(req, res);
});

// Edit strategy
router.get('/edit/:id', function (req, res) {
    strategy.edit(req, res);
});

// Edit update
router.post('/update/:id', function (req, res) {
    strategy.update(req, res);
});

// Edit update
router.post('/delete/:id', function (req, res, next) {
    strategy.delete(req, res);
});

// // Get all strategys
// router.get('/', strategy.list);

// // Get single strategy by id
// router.get('/show/:id', strategy.show);

// // Create strategy
// router.get('/create', strategy.create);

// // Save strategy
// router.post('/save', strategy.save);

// // Edit strategy
// router.get('/edit/:id', strategy.edit);

// // Edit update
// router.post('/update/:id', strategy.update);

// // Edit update
// router.post('/delete/:id', strategy.delete);

module.exports = router;