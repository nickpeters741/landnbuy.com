var express = require('express');
var router = express.Router();
var Building = require('../models/buildings');
var Land = require('../models/lands');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
  var userActive = false;
  if (req.user) {
    userActive = true;
  }

  async.parallel({
    building: function (callback) {
      Building.find({
          'approved': true
        }).limit(6).sort({
          $natural: -1
        })
        .exec(callback)
    },
    land: function (callback) {
      Land.find({
          'approved': true
        }).limit(6).sort({
          $natural: -1
        })
        .exec(callback)
    },
  }, function (err, results) {
    res.render('index', {
      title: 'landNbuy',
      data: results,
      userActive: userActive
    });
  })
});

module.exports = router;