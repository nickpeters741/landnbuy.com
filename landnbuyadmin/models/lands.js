var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LandSchema = new Schema({
    heading: {
        type: String,
        required: true, ////////////////////////////
    },
    description: {
        type: String,
        required: true, ///////////////////////////
    },
    commission: {
        type: String,
        required: true, ///////////////////////////
    },
    googleLocation: {
        type: String,
        required: false, ///////////////////////////
    },
    price: {
        type: String,
        required: true, ///////////////////
    },
    location: {
        type: String,
        required: true, ///////////////////
    },
    listingType: { //for sale or for rent
        type: String,
        required: true, ////////////////////
    },
    category:{
        type: String, // residential, commercial
        required: true, 
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    amenities: Object, /////////
    images: Array,
    uploader: {
        type: String,
        required: true
    },
    uploaderID: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    }
});

//Export model
module.exports = mongoose.model('Lands', LandSchema);