var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');


var Schema = mongoose.Schema;

var LandSchema = new Schema({
    first_name:{
        type:String,
        required:false
    },
    last_name:{
        type:String,
        required:false
    },
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
    commissionSetting: {
        type: String,
        required: true, ///////////////////////////
    },
    googleLocation: {
        type: String,
        required: false, ///////////////////////////
    },
    ownerName: {
        type: String,
        required: false, ///////////////////////////
    },
    owenrPhoneNumber: {
        type: String,
        required: false, ///////////////////////////
    },
    price: {
        type: String,
        required: true, ///////////////////
    },
    county: {
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
    panorama: Array,
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
LandSchema.plugin(mongoosePaginate);


//Export model
module.exports = mongoose.model('Lands', LandSchema);