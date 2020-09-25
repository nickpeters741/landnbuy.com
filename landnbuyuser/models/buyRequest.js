var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var buyRequestSchema = new Schema({
    name: {
        type: String,
        required: true, ////////////////////////////
    },
    email: {
        type: String,
        required: true, ///////////////////////////
    },
    phoneNumber: {
        type: String,
        required: true, ///////////////////////////
    },
    propertyID: {
        type: String,
        required: true, ///////////////////////////
    },
    done: {
        type: String,
        required: true,
        default: false,
    }
});

//Export model
module.exports = mongoose.model('BuyRequest', buyRequestSchema);