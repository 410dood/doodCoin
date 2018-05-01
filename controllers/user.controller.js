// controllers – defines your app routes and their logic

console.log("userController page");

var mongoose = require("mongoose");
var User = require("../models/user");

var userController = {};

// Show list of users
userController.list = function(req, res){
  user.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render('../views/users/index' , {users: users});
    }
  });
};

// Show strategy by id
userController.show = function(req, res) {
  console.log("does username print below");
  console.log(USERNAME)
  Strategy.findOne({_id: req.params.id}).exec(function (err, strategy) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/show", {user: user});
    }
  });
};

// Create new strategy
userController.create = function(req, res) {
  res.render("../views/users/create");
};

// Save new strategy
userController.save = function(req, res) {
  var email = USERNAME
  console.log(email)
  req.body.name = name.email
  var strategy = new Strategy(req.body);

  strategy.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/users/create");
    } else {
      console.log("Successfully created an strategy.");
      res.redirect("/users/show/"+strategy._id);
    }
  });
};

// Edit an strategy
userController.edit = function(req, res) {
  Strategy.findOne({_id: req.params.id}).exec(function (err, strategy) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(strategy);
      res.render("../views/users/edit", {strategy: strategy});
    }
  });
};

// Update an strategy
userController.update = function(req, res) {
  Strategy.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, variables: req.body.variables, currency: req.body.currency, coin: req.body.coin }}, { new: true }, function (err, strategy) {
    if (err) {
      console.log(err);
      res.render("../views/users/edit", {strategy: req.body});
    }
    res.redirect("/users/show"+strategy._id);
  });
};

// Delete an strategy
userController.delete = function(req, res) {
  Strategy.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Strategy deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;
