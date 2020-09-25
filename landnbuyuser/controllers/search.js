var Building = require('../models/buildings');
var Land = require('../models/lands');
var userActive = false;

exports.full_search = function (req, res) {
  console.log('req.body')
  console.log(req.body)
  if (req.body.category == 'Land') {
    if (req.body.minPrice == '') {
      if (req.body.maxPrice != '') {
        Land.find({
          'location': req.body.location,
          'listingType': req.body.type,
          'price': {
            $lte: req.body.maxPrice
          }
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'land'
            })
          }
        })
      } else {
        Land.find({
          'location': req.body.location,
          'listingType': req.body.type,
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'land'
            })
          }
        })
      }
    } else if (req.body.maxPrice == '') {
      if (req.body.minPrice != '') {
        Land.find({
          'location': req.body.location,
          'listingType': req.body.type,
          'price': {
            $gte: req.body.minPrice
          }
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'land'
            })
          }
        })
      } else {
        Land.find({
          'location': req.body.location,
          'listingType': req.body.type,
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'land'
            })
          }
        })
      }
    } else {
      console.log('came to else')
      Land.find({
        'location': req.body.location,
        'listingType': req.body.type,
        'price': {
          $lte: req.body.maxPrice,
          $gte: req.body.minPrice
        }
      }, function (err, data) {
        if (err) {
          console.log(err)
        } else {

          res.render('search', {
            data: data,
            userActive: userActive,
            propertyType: 'land'
          })
        }
      })
    }
  } else {
    if (req.body.minPrice == '') {
      if (req.body.maxPrice != '') {
        Building.find({
          'location': req.body.location,
          'listingType': req.body.type,
          'price': {
            $lte: req.body.maxPrice
          }
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'building'
            })
          }
        })
      } else {
        Building.find({
          'location': req.body.location,
          'listingType': req.body.type,
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'building'
            })
          }
        })
      }
    } else if (req.body.maxPrice == '') {
      if (req.body.minPrice != '') {
        Building.find({
          'location': req.body.location,
          'listingType': req.body.type,
          'price': {
            $gte: req.body.minPrice
          }
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'building'
            })
          }
        })
      } else {
        Building.find({
          'location': req.body.location,
          'listingType': req.body.type,
        }, function (err, data) {
          if (err) {
            console.log(err)
          } else {

            res.render('search', {
              data: data,
              userActive: userActive,
              propertyType: 'building'
            })
          }
        })
      }
    } else {
      console.log('came to else')
      Building.find({
        'location': req.body.location,
        'listingType': req.body.type,
        'price': {
          $lte: req.body.maxPrice,
          $gte: req.body.minPrice
        }
      }, function (err, data) {
        if (err) {
          console.log(err)
        } else {

          res.render('search', {
            data: data,
            userActive: userActive,
            propertyType: 'building'
          })
        }
      })
    }

  }
}
exports.search_buildings = function (req, res) {
  var listingType;
  var category = req.body.ptyCategory;
  var location = req.body.location;
  // var location = req.body.ptyLocation;

  if (req.body.ptyStatus == 'Rent') {
    listingType = 'For Rent'

  } else if (req.body.ptyStatus == 'Buy') {
    listingType = 'For Sale'
  }


  // res.render('search')

  Building.find({
    'listingType': listingType,
    'category': category,
    'county': {
      $regex: new RegExp("^" + location.toLowerCase(), "i")
    },
  }, function (err, buildings) {
    if (err) {
      console.log(err)
    } else {
      if (req.user) {
        userActive = true;
      }
      res.render('search', {
        data: buildings,
        userActive: userActive
      })
    }
  });
}
exports.search_lands = function (req, res) {
  var listingType;
  var category = req.body.ptyCategory;
  var location = req.body.location;
  // var location = req.body.ptyLocation;

  if (req.body.ptyStatus == 'Rent') {
    listingType = 'For Rent'

  } else if (req.body.ptyStatus == 'Buy') {
    listingType = 'For Sale'
  }


  // res.render('search')

  Land.find({
    'listingType': listingType,
    'category': category.toLowerCase(),
    'county': {
      $regex: new RegExp("^" + location.toLowerCase(), "i")
    },
  }, function (err, buildings) {
    if (err) {
      console.log(err)
    } else {
      if (req.user) {
        userActive = true;
      }
      console.log('lands')
      console.log(buildings)
      res.render('search', {
        data: buildings,
        userActive: userActive
      })
    }
  });

}