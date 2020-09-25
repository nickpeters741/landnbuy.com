// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    agent: {
        type: Boolean,
        default: false,
        required: true,
    },
    agentInfo: {
        type: Array,
        required: false,
    },
    step: {
        type: String,
        required: true,
        default: '1'
    },
    approved:{
        type: Boolean,
        required: true,
        default: false
    }
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     name         : String,
    //     email        : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    console.log('tried to check password')
    console.log(bcrypt.compareSync(password, this.local.password))
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);