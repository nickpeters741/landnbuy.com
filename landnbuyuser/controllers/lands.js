var Lands = require('../models/lands');
var landImages = require('../app');

var userActive = false;


exports.get_land_details = function (req, res) {
  console.log('got here');
  var landID = req.params.landID
  Lands.find({
      '_id': landID
    })
    .exec(function (err, land) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        if (req.user) {
          userActive = true;
        }
        var amenities = land[0].amenities.split(',');
        res.render('landSingle', {
          data: land,
          amenities: amenities,
          userActive:userActive
        })
      }
    })
}
exports.get_awaiting_land_details = function (req, res) {
  var landID = req.params.landID
  Lands.find({
      '_id': landID
    })
    .exec(function (err, land) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        if (req.user) {
          userActive = true;
        }
        var amenities = land[0].amenities.split(',');
        res.render('landSingleAwaiting', {
          data: land,
          amenities: amenities,
          userActive:userActive
        })
      }
    })
}
exports.save_land = function (req, res) {
  landImages.upload2(req, res, (err) => {
    var uploader = req.body.uploader
    console.log('uploader')
    console.log(req.body)
    if (err) {
      console.log('err')
      console.log(err)
    } else {
      if (req.files == undefined) {
        console.log(req.file)
        console.log('Error: No File Selected!')
        res.send({
          status: 'error'
        })
      } else {
        var images = req.files;
        var imagesArray = new Array();
        var panoramaArray = new Array();
        for (i = 0; i < images.length; i++) {

          console.log(images[i].fieldname)
          if (images[i].fieldname == 'photo') {
            imagesArray.push(images[i].filename);
          } else {
            panoramaArray.push(images[i].filename);
          }
        }
        console.log('req.body.commission')
        console.log(req.body)


        //Save all payments details even if payment was unsuccessfull
        if (uploader == 'owner') {
          console.log('came to onwer')
          var landOwner = new Lands({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            heading: req.body.heading,
            description: req.body.description,
            commission: req.body.commission[0],
            commissionSetting: req.body.commissionSetting,
            googleLocation: req.body.googleLocation[0],
            price: req.body.price,
            county: req.body.county[0],
            location: req.body.location[0],
            listingType: req.body.listingType,
            category: req.body.category,
            amenities: req.body.amenities,
            images: imagesArray,
            panorama: panoramaArray,
            uploader: 'owner',
            phoneNumber: req.body.phoneNo[0]
          });
          landOwner.save(function (err, landInfo) {
            if (err) {
              console.log(err)
            } else {
              console.log('buildingInfo')
              console.log(landInfo)
              console.log(landInfo.id)
              res.send({
                status: 'ok',
                landId: landInfo.id,
                landCategory: landInfo.category
              })
            }
          });
        } else if (uploader == 'agent') {
          console.log('came to agent')
          console.log('req.body')
          console.log(req.body)
          var landAgent = new Lands({
            heading: req.body.heading,
            description: req.body.description,
            commission: req.body.commission[0],
            commissionSetting: req.body.commissionSetting,
            googleLocation: req.body.googleLocation[0],
            ownerName: req.body.ownerName[0],
            owenrPhoneNumber: req.body.owenrPhoneNumber,
            price: req.body.price[0],
            county: req.body.county[0],
            location: req.body.location[0],
            listingType: req.body.listingType,
            category: req.body.category,
            amenities: req.body.amenities,
            images: imagesArray,
            panorama: panoramaArray,
            uploader: 'agent',
            uploaderID: req.body.uploaderID
          });
          landAgent.save(function (err, landInfo) {
            if (err) {
              console.log(err)
            } else {
              console.log('buildingInfo')
              console.log(landInfo)
              console.log(landInfo.id)
              res.send({
                status: 'ok',
                landId: landInfo.id,
                landCategory: landInfo.category
              })
            }
          });
        } else {
          res.send({
            status: 'bad',
            err: 'Error! Bad input'
          })
        }

      }
    }
  })
}