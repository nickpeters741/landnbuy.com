// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var resetSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },

});
// create the model for users and expose it to our app
module.exports = mongoose.model('ResetPassword', resetSchema);
