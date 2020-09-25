// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define the schema for our user model
var interviewSchema = mongoose.Schema({

    interviewType: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    interviewee: {
        type: Schema.ObjectId,
        ref:'User',
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },

});
// create the model for users and expose it to our app
module.exports = mongoose.model('Interview', interviewSchema);
