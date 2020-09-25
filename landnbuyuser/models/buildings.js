var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
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
    county: {
        type: String,
        required: true, ///////////////////
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
BuildingSchema.plugin(mongoosePaginate);
//Export model
module.exports = mongoose.model('Buildings', BuildingSchema);