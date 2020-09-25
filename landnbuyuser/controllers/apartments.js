var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var Apartment = require('../models/apartments');
var apartmentImage = require('../app')

// Display Business create form on GET.
exports.save_apartment = function (req, res, next) {
  apartmentImage.upload2(req, res, (err) => {
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
        for (i = 0; i < images.length; i++) {
          imagesArray.push(images[i].filename)
        }
        var apartment = new Apartment({
          heading: req.body.heading,
          description: req.body.description,
          price: req.body.price,
          listingType: req.body.listingType,
          category: req.body.category,
          type: req.body.houseType,
          location: req.body.location[0],
          bedrooms: req.body.bedrooms,
          amenities: req.body.amenities,
          images: imagesArray
        });

        //Save all payments details even if payment was unsuccessfull
        apartment.save(function (err, apartmentInfo) {
          if (err) {
            console.log(error)
          } else {
            console.log('apartmentInfo')
            console.log(apartmentInfo.id)
            res.send({
              status: 'ok',
              apartmentId: apartmentInfo.id
            })
          }
        });
      }
    }
  })
}
exports.delete_apartment = function (req, res, next) {}
exports.update_apartment = function (req, res, next) {}


//Get latest Apartments
exports.latest_apartment = function (req, res, next) {
  Apartment.find().limit(6)
    .exec(function (err, apartments) {
      if (err) {
        return next(err);
      }
      console.log('apartments')
      console.log(apartments)
      res.send({
        status: 'ok',
        data: apartments
      });
    });
}