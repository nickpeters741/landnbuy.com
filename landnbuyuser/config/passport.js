// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/users');
var Agent = require('../models/agents');
// expose this function to our app using module.exports
module.exports = function (passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({
          'local.email': email
        }, function (err, user) {
          // if there are any errors, return the error
          if (err)
            return done(err);

          // check to see if theres already a user with that email
          if (user) {
            console.log('email taken')
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }

        });

      });

    }));
  passport.use('agent-local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({
          'local.email': email
        }, function (err, user) {
          // if there are any errors, return the error
          if (err)
            console.log('err')
          console.log(err)
          // return done(err);

          // check to see if theres already a user with that email
          if (user) {
            if (user.agentInfo.length == 0) {
              User.updateOne({
                  _id: user._id
                }, {
                  $set: {
                    'agentInfo': {
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      phoneNo: req.body.phoneNo,
                      location: req.body.location,
                      county: req.body.county[0],
                      identity: req.body.identity,
                      passport: req.body.passport,
                    },
                    'agent': false,
                    'step': '2'
                  }
                },
                function (err, userInfo) {
                  if (err) {
                    console.log('=======================')
                    console.log(err)
                    return next(err);
                  } else {
                    console.log('userInfo')
                    console.log(userInfo)
                  }

                });
            } else {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }

          } else {
            console.log('req.body.isAgent')
            console.log(req.body.isAgent)

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.agent = true;
            newUser.step = '2';
            newUser.agentInfo = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              agentType: req.body.agentType,
              phoneNo: req.body.phoneNo,
              location: req.body.location,
              county: req.body.county[0],
              identity: req.body.identity,
              passport: req.body.passport,
              referee: req.body.referee,
              refereeContact: req.body.refereeContact,
            };

            // save the user
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }

        });

      });

    }));
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.email': email
      }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
      });

    }));
  passport.use('agent-local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form
      console.log('got here too')
      console.log(email)
      console.log(password)
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.email': email
      }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('agentLoginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('agentLoginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log(user)
        return done(null, user);
      });

    }));



};