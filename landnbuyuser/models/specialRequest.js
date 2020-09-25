// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var specialRequestlSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

});
// create the model for users and expose it to our app
module.exports = mongoose.model('SpecialReqiest', specialRequestlSchema);