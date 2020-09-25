// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var agentSchema = mongoose.Schema({

  local: {
    email: String,
    password: String,
  },
  // firstName: {
  //   type: String,
  //   required: true
  // },
  // lastName: {
  //   type: String,
  //   required: true
  // },
  // phoneNo: {
  //   type: String,
  //   required: true
  // },
  // location: {
  //   type: String,
  //   required: true
  // },
  // identity: {
  //   type: String,
  //   required: true
  // },

});

// methods ======================
// generating a hash
agentSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
agentSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Agent', agentSchema);