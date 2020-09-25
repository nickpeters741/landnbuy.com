var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var async = require('async');

//models
var Buildings = require('./models/buildings');
var Lands = require('./models/lands');
var Interviews = require('./models/interviews');
var Users = require('./models/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Passport
var passport = require('passport');
require('./config/passport')(passport);

var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(session({
  secret: 'landnbuy',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

//Import the mongoose module
var mongoose = require('mongoose');
var mongoDB = 'mongodb://landnbuy:landnbuy2019@ds337718.mlab.com:37718/landnbuy';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', isLoggedIn, function (req, res) {
  res.render('index', {
    username: req.user.username
  })
});

app.get('/dashboard', isLoggedIn, function (req, res, next) {
  res.render('signup', {
    status: 'ok',
    msg: req.flash('signupMessage')
  });
});

//building
app.post('/approved-building', function (req, res, next) {
  console.log('came here')
  console.log(req.body)
  Buildings.update({
      '_id': req.body.id
    }, {
      "approved": req.body.approved,
    })
    .exec(function (err, buildings) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('buildings')
        console.log(buildings)
        res.send({
          status: 'ok'
        });
      }
    });
});
//Approved Agent
app.post('/approved-agent', function (req, res, next) {
  console.log('came here')
  console.log(req.body)
  if (req.body.approved == true) {
    Users.updateOne({
        '_id': req.body.id
      }, {
        "approved": req.body.approved,
        'step': 'done'
      })
      .exec(function (err, agent) {
        if (err) {
          console.log('err')
          console.log(err)
          res.send({
            status: 'bad'
          });
        } else {
          console.log('agent')
          console.log(agent)
          res.send({
            status: 'ok'
          });
        }
      });
  } else {
    Users.updateOne({
        '_id': req.body.id
      }, {
        "approved": req.body.approved,
        'step': 'done'
      })
      .exec(function (err, agent) {
        if (err) {
          console.log('err')
          console.log(err)
          res.send({
            status: 'bad'
          });
        } else {
          console.log('agent')
          console.log(agent)
          res.send({
            status: 'ok'
          });
        }
      });
  }
});
//Approved land
app.post('/approved-land', function (req, res, next) {
  console.log('came here')
  console.log(req.body)
  Lands.update({
      '_id': req.body.id
    }, {
      "approved": req.body.approved,
    })
    .exec(function (err, lands) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('lands')
        console.log(lands)
        res.send({
          status: 'ok'
        });
      }
    });
});
app.post('/saveBuilding', isLoggedIn, function (req, res, next) {

  Buildings.update({
      '_id': req.body.id
    }, {
      "heading": req.body.heading,
      "description": req.body.description,
      "commission": req.body.commission,
      "googleLocation": req.body.googleLocation,
      "listingType": req.body.listingType,
      "category": req.body.category,
      "type": req.body.type,
      "ameminties": req.body.ameminties,
      "price": req.body.price,
      "location": req.body.location,
    })
    .exec(function (err, buildings) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('buildings')
        console.log(buildings)
        res.send({
          status: 'ok'
        });
      }
    });
});
app.get('/buildings/pending', isLoggedIn, function (req, res, next) {
  Buildings.find({
      'approved': false
    })
    .exec(function (err, buildings) {
      if (err) {
        return next(err);
      } else {
        console.log('buildings')
        console.log(buildings)
        res.render('pendingBuildings', {
          buildings: buildings
        });
      }
    });
});
app.get('/buildings/active', isLoggedIn, function (req, res, next) {
  Buildings.find({
      'approved': true
    })
    .exec(function (err, buildings) {
      if (err) {
        return next(err);
      } else {
        console.log('buildings')
        console.log(buildings)
        res.render('buildings', {
          buildings: buildings
        });
      }
    });
});
app.get('/buildings/:id', function (req, res, next) {
  Buildings.findOne({
      '_id': req.params.id
    })
    .exec(function (err, building) {
      if (err) {
        return next(err);
      } else {
        console.log('buildings')
        console.log(building)
        var amenities = building.amenities.split(',');
        res.render('buildingSingle', {
          building: building,
          amenities: amenities
        });
      }
    });
});
//Active and Pending lands
app.get('/lands/pending', function (req, res, next) {
  Lands.find({
      'approved': false
    })
    .exec(function (err, lands) {
      if (err) {
        return next(err);
      } else {
        console.log('lands')
        console.log(lands)
        res.render('pendingLands', {
          lands: lands
        });
      }
    });
});
app.get('/lands/active', isLoggedIn, function (req, res, next) {
  Lands.find({
      'approved': true
    })
    .exec(function (err, lands) {
      if (err) {
        return next(err);
      } else {
        console.log('lands')
        console.log(lands)
        res.render('lands', {
          lands: lands
        });
      }
    });
});
app.get('/lands/:id', function (req, res, next) {
  Lands.findOne({
      '_id': req.params.id
    })
    .exec(function (err, land) {
      if (err) {
        return next(err);
      } else {
        console.log('land')
        console.log(land)
        var amenities = land.amenities.split(',');
        res.render('landSingle', {
          land: land,
          amenities: amenities
        });
      }
    });
});

//Interviews
app.get('/interviews', function (req, res) {
  Interviews.find()
    .exec(function (err, interviews) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('interviews.approved')
        console.log(interviews[0])
        res.render('interviews', {
          data: interviews,
          interviewee: interviews[0].interviewee,
          approved: interviews.approved
        });
      }
    });
});
app.get('/interviewee/:id', function (req, res) {
  Users.find({
      '_id': req.params.id
    })
    .exec(function (err, data) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('data')
        console.log(data)
        res.render('interviewee', {
          interviewee: data,
          info: data[0].agentInfo[0],
          id: data[0]._id
        });
      }
    });
});
app.post('/interviewee/step2/:id/approve', function (req, res) {
  Users.updateOne({
      '_id': req.params.id
    }, {
      'step': '3'
    })
    .exec(function (err, data) {
      if (err) {
        console.log('err')
        console.log(err)
        res.send({
          status: 'ok'
        });
      } else {
        console.log('data')
        console.log(data)
        res.send({
          status: 'ok'
        });
      }
    });
});
app.post('/interviewee/step3/:id/approve', function (req, res) {
  Users.updateOne({
      '_id': req.params.id
    }, {
      'step': 'done'
    })
    .exec(function (err, data) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('data')
        console.log(data)
        res.send({
          status: 'ok'
        });
      }
    });
});
app.post('/interviewee/:id/disapprove', function (req, res) {});

//users
app.get('/agents', function (req, res, next) {
  Users.find()
    .exec(function (err, data) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('data')
        console.log(data)
        res.render('agents', {
          status: 'ok',
          agents: data
        });
      }
    });
});
app.get('/agents/:id', function (req, res, next) {
  Users.find({
      '_id': req.params.id
    })
    .exec(function (err, data) {
      if (err) {
        console.log('err')
        console.log(err)
      } else {
        console.log('data')
        console.log(data)
        res.render('agentSingle', {
          status: 'ok',
          agent: data
        });
      }
    });
});
//lands
app.get('/lands/pending', isLoggedIn, function (req, res, next) {
  res.render('pendingLands', {
    status: 'ok',
  });
});
app.get('/lands/active', isLoggedIn, function (req, res, next) {
  res.render('lands', {
    status: 'ok',
  });
});

//Signup Page
app.get('/signup', function (req, res, next) {
  res.render('signup', {
    status: 'ok',
    msg: req.flash('signupMessage')
  });
});
// process the signup form
app.post('/signup', function (req, res) {
  passport.authenticate('local-signup', {}, function (err, user, info) {
    if (user == false) {
      console.log('user info exist')
      res.status(200).json({
        status: 'bad',
        msg: 'Error! Email already exist'
      });

    } else {
      // req.user = req.user
      user => done(null, user)
      req.login(user, {}, function (err) {
        if (err) {
          return next(err)
        };
        req.user.username = req.body.username;
        res.status(200).json({
          status: 'ok',
          userID: req.user._id
        });
      });

    }

  })(req, res);
})

//Login Page
app.get('/login', function (req, res, next) {
  res.render('login', {
    msg: req.flash(),
  });
});

// process the login form
app.post('/login', function (req, res, next) {
  console.log('came here')
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log('got an error')
      console.log(err)
      res.send({
        status: 'bad',
        msg: 'Error! Try again later'
      })
    } else {
      if (!user) {
        // return res.redirect('/login');
        res.send({
          status: 'bad',
          msg: 'User does not exist'
        })
      } else {
        console.log('user is okay')
        console.log(req.session.returnTo)
        if (req.session.returnTo == undefined) {
          req.session.returnTo = '/'
        }
        user => done(null, user)
        req.login(user, {}, function (err) {
          if (err) {
            return next(err)
          };
          req.user.username = req.body.username;
          res.status(200).json({
            status: 'ok',
            url: req.session.returnTo
          });
        });
      }
    }


  })(req, res, next);
});

//Logout user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  req.session.returnTo = req.originalUrl
  console.log('req.originalUrl')
  console.log(req.originalUrl)
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/login');
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;