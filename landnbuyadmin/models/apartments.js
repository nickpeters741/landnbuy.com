var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApartmentSchema = new Schema({
    heading: {
        type: String,
        required: true,////////////////////////////
    },
    description: {
        type: String,
        required: true,///////////////////////////
    },
    price: {
        type: String,
        required: true,///////////////////
    },
    listingType: {//for sale or for rent
        type: String,
        required: true,////////////////////
    },
    category: {
        type: String,
        required: true,/////////////////////////
    },
    type: {
        type: String,
        required: true,///////////////
    },
    location: {
        type: String,
        required: true,////////////////////////////////
    },
    bedrooms: {
        type: String,
        required: false,////////
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    amenities: Object,/////////
    images: Array,
});

//Export model
module.exports = mongoose.model('Apartments', ApartmentSchema);