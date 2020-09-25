var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
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
    listingType: { //for sale or for rent
        type: String,
        required: true, ////////////////////
    },
    category: {
        type: String,
        required: true, /////////////////////////
    },
    type: {
        type: String,
        required: false, ///////////////
    },
    location: {
        type: String,
        required: true, ////////////////////////////////
    },
    bedrooms: {
        type: String,
        required: false, ////////
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
module.exports = mongoose.model('Buildings', BuildingSchema);