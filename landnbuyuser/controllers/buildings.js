var Building = require('../models/buildings');
var buildingImages = require('../app');
var SearchNull = require('../models/searchNull');

var userActive = false;

exports.get_apartments = function (req, res) {
  var activePage = req.params.page;
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Building.paginate({
    'type': 'Apartment',
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('result=================')
      console.log(results.docs)
      res.render('apartments', {
        title: 'landNbuy',
        data: results.docs,
        userActive: userActive,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
}
// Display Business create form on GET.
exports.save_building = function (req, res, next) {
  var uploader = req.url.split('/').pop();
  buildingImages.upload2(req, res, (err) => {
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
        console.log('here are the images')
        console.log(req.files)
        console.log(req.files.length)
        console.log(req.files[0])
        console.log(req.files[1])
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

        //Save all payments details even if payment was unsuccessfull
        if (uploader == 'owner') {
          var buildingOwner = new Building({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            heading: req.body.heading,
            description: req.body.description,
            commission: req.body.commission[0],
            commissionSetting: req.body.commissionSetting[0],
            googleLocation: req.body.googleLocation[0],
            price: req.body.price,
            listingType: req.body.listingType,
            category: req.body.category,
            type: req.body.houseType,
            county: req.body.county[0],
            location: req.body.location[0],
            bedrooms: req.body.bedrooms,
            amenities: req.body.amenities,
            images: imagesArray,
            panorama: panoramaArray,
            uploader: 'owner',
            phoneNumber: req.body.phoneNo[0]
          });
          buildingOwner.save(function (err, buildingInfo) {
            if (err) {
              console.log(err)
            } else {
              console.log('buildingInfo')
              console.log(buildingInfo.id)
              res.send({
                status: 'ok',
                buildingId: buildingInfo.id
              })
            }
          });
        } else if (uploader == 'agent') {
          console.log('req.body')
          console.log(req.body)
          var buildingAgent = new Building({
            heading: req.body.heading,
            description: req.body.description,
            commission: req.body.commission[0],
            commissionSetting: req.body.commissionSetting[0],
            googleLocation: req.body.googleLocation[0],
            price: req.body.price,
            listingType: req.body.listingType,
            category: req.body.category,
            type: req.body.houseType,
            county: req.body.county[0],
            location: req.body.location[0],
            bedrooms: req.body.bedrooms,
            amenities: req.body.amenities,
            images: imagesArray,
            panorama: panoramaArray,
            uploader: 'agent',
            uploaderID: req.body.uploaderID
          });

          buildingAgent.save(function (err, buildingInfo) {
            if (err) {
              console.log(err)
            } else {
              console.log('buildingInfo')
              console.log(buildingInfo.id)
              res.send({
                status: 'ok',
                buildingId: buildingInfo.id
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
exports.get_bangalows = function (req, res) {
  var activePage = req.params.page;
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Building.paginate({
    'type': 'Bangalow',
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('result=================')
      console.log(results.docs)
      res.render('bangalows', {
        title: 'landNbuy',
        data: results.docs,
        userActive: userActive,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
}
exports.get_mansions = function (req, res) {
  var activePage = req.params.page;
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Building.paginate({
    'type': 'Mansion',
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('result=================')
      console.log(results.docs)
      res.render('mansions', {
        title: 'landNbuy',
        data: results.docs,
        userActive: userActive,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
}
exports.get_commercial = function (req, res) {
  var activePage = req.params.page;
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Building.paginate({
    'category': 'Commercial',
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('result=================')
      console.log(results.docs)
      res.render('commercialBuildings', {
        title: 'landNbuy',
        data: results.docs,
        userActive: userActive,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
}
exports.get_industrial = function (req, res) {
    var activePage = req.params.page;
    var activePage = req.params.page;
    const options = {
      page: parseInt(activePage),
      limit: 12
    }
    Building.paginate({
      'category': 'Industrial',
      'approved': true
    }, options).then((results, err) => {
      if (!err) {
        console.log('result=================')
        console.log(results.docs)
        res.render('industrialBuildings', {
          title: 'landNbuy',
          data: results.docs,
          userActive: userActive,
          page_count: results.totalPages,
          totalPages: results.totalPages,
          currentPage: activePage
        })
        //Pass the totalpages number to pug along with the result
  
      } else {
        console.log('came here')
      }
    })
}
exports.building_details = function (req, res) {
  Building.findOne({
    _id: req.params.id
  }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      if (req.user) {
        userActive = true;
      }
      if (data == null) {
        res.render('buildingSingle', {
          status: 'ok',
          data: null,
          userActive: userActive
        });
      } else {
        var amenities = data.amenities.split(',');
        res.render('buildingSingle', {
          status: 'ok',
          data: data,
          url: req.params.id,
          amenities: amenities,
          propertyID: data._id,
          userActive: userActive
        });
      }
    }
  })
}
exports.building_awating_confirmation = function (req, res) {
  Building.findOne({
    _id: req.params.id
  }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      if (req.user) {
        userActive = true;
      }
      if (data == null) {
        res.render('buildingAwaitingSingle', {
          status: 'ok',
          data: null,
          userActive: userActive
        });
      } else {
        var amenities = data.amenities.split(',');
        res.render('buildingAwaitingSingle', {
          status: 'ok',
          data: data,
          url: req.params.id,
          amenities: amenities,
          propertyID: data._id,
          userActive: userActive
        });
      }
    }
  })
}
exports.search_emptyUsers = function (req, res) {
  console.log('req.body')
  console.log(req.body)
  var nullsearch = new SearchNull({
    name: req.body.name,
    email: req.body.email,
  });

  //Save all payments details even if payment was unsuccessfull
  nullsearch.save(function (err, data) {
    if (err) {
      console.log(err)
      res.send({
        status: 'bad',
        msg: "Err! Please try again later."
      })
    } else {
      res.send({
        status: 'ok',
        msg: "Successful! We'll get back to your as soon as possible"
      })
    }
  });
  // res.send({
  //   status: 'ok'
  // })
}