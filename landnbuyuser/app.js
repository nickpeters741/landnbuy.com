var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var async = require("async");
var nodemailer = require('nodemailer');
var moment = require('moment');
var gMail = require('./controllers/GmailPassword');
var https = require('https');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bcrypt = require('bcrypt-nodejs');
var saltRounds = 10;

var apartment_controller = require('./controllers/apartments');
var building_controller = require('./controllers/buildings');
var search_controller = require('./controllers/search');
var land_controller = require('./controllers/lands');

var Apartments = require('./models/apartments');
var Buildings = require('./models/buildings');
var Lands = require('./models/lands');
var Interview = require('./models/interviews');
var User = require('./models/users');
var Message = require('./models/messages');
var ResetPassword = require('./models/resetPasswords');
var BuyRequest = require('./models/buyRequest');
var Dates = require('./models/disabledDates');

var app = express();

var userActive = false;

//Passport
var passport = require('passport');
require('./config/passport')(passport);

var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//Multer Upload Image
var multer = require('multer')
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Upload Team Member
exports.upload = multer({
  fileFilter: function (req, file, cb) {
    console.log('file type is -' + file.mimetype)
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      console.log('goes wrong on the mimetype');
      cb(null, false);
    }
    cb(null, true);
  },
  storage: storage
}).single('photo');
exports.upload2 = multer({
  fileFilter: function (req, file, cb) {
    console.log('file type is -' + file.mimetype)
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      console.log('goes wrong on the mimetype');
      cb(null, false);
    }
    cb(null, true);
  },
  storage: storage
}).any();
var upload = multer({
  fileFilter: function (req, file, cb) {
    console.log('file type is -' + file.mimetype)
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      console.log('goes wrong on the mimetype');
      cb(null, false);
    }
    cb(null, true);
  },
  storage: storage
}).array('photo', 3);
var uploadContract = multer({
  fileFilter: function (req, file, cb) {
    console.log('file type is -' + file.mimetype)
    cb(null, true);
  },
  storage: storage
}).single('photo');


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

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Send request of properties
app.post('/send-property-request', function (req, res) {
  var sender = req.body.requestEmail
  console.log('sender')
  console.log(sender)
  console.log(req.body);
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@landnbuy.com',
        pass: gMail.password
      }
    });

    // setup email data with unicode symbols
    let subscriber = {
      from: 'landNbuy <no-reply@landnbuy.com>', // sender address
      to: 'specialrequests@landnbuy.com', // list of receivers
      subject: 'New Property Request ✔', // Subject line
      text: 'Hi', // plain text body
      html: '<div style="background: black;color: white;padding: 20px 15px;border-radius: 10px;"><h5 style=" text-align: center; font-size: 2em; font-weight: bold; margin: 0;">New Property Request!</h5><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Name:</span>' + req.body.requestName + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Email:</span>' + req.body.requestEmail + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Phone Number:</span>' + req.body.requestPhoneNo + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Description:</span>' + req.body.requestDetails + '</p><p></p><img src="https://www.landnbuy.com/img/emailFooter.jpeg" style="width: 100%; height: auto; object-fit: cover;"></div>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(subscriber, (error, info) => {
      if (error) {
        console.log(error)
        res.send({
          status: 'err',
          err: "Error! Please enter a valid email"
        });
      } else {
        //Message sent successfully function here
        nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'no-reply@landnbuy.com',
              pass: gMail.password
            }
          });

          // setup email data with unicode symbols
          let subscriber = {
            from: 'landNbuy <noreply@landnbuy.com>', // sender address
            to: sender, // list of receivers
            subject: 'Request Received ✔', // Subject line
            text: 'Hi', // plain text body
            html: "<div style='background:black;color:white;padding:20px 15px;border-radius:10px;text-align: center;'><h5 style='text-align:center;font-size:2em;font-weight:bold;margin:0'>Request Sent Successfully</h5><p style='font-size:1.2em;padding: 0;margin: 0;'>We'll get back to you as soon as possible</p><p style='font-size:1.2em;margin: 0;'>Thank you for choosing us.</p><div class='yj6qo'></div><div class='adL'><p></p></div><img src='https://www.landnbuy.com/img/emailFooter.jpeg' style='width: 100%; height: auto; object-fit: cover;'></div>" // html body
          };
          // send mail with defined transport object
          transporter.sendMail(subscriber, (error, info) => {
            if (error) {
              console.log('eror here')
              console.log(error)
              res.send({
                status: 'err',
                err: "Error! Please enter a valid email"
              });
            } else {
              //Message sent successfully function here
              console.log('successful')
              res.send({
                status: 'ok'
              });
            }
          });
        });
      }
    });
  });
})

//Contact Page
app.get('/contact', function (req, res, next) {
  if (req.user) {
    userActive = true;
  }
  res.render('contact', {
    status: 'ok',
    userActive: userActive
  });
});

//Apartments
app.get('/apartments', function (req, res, next) {
  Apartments.find()
    .exec(function (err, apartments) {
      if (err) {
        return next(err);
      }
      console.log('apartments')
      console.log(apartments)
      res.render('apartments', {
        title: 'landNbuy',
        data: apartments
      });
    });
});

//Lands
app.get('/lands', function (req, res, next) {
  res.render('lands', {
    status: 'ok',
  });
});
app.get('/lands/:category/:page', function (req, res, next) {
  var activePage = req.params.page;
  var category = req.params.category;
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Lands.paginate({
    'category': category,
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('result=================')
      console.log(results.docs)
      res.render('lands', {
        status: 'ok',
        category: category,
        lands: results.docs,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
});
//Houses
app.get('/houses', function (req, res, next) {
  res.render('houses', {
    status: 'ok',
  });
});


//Agent Complete Setup
app.get('/agent/signup/complete', function (req, res) {
  res.render('agentCongratulations', {
    status: 'ok',
    userID: req.user._id
  });
});
//Agent Step3
app.get('/agent/signup/step3/:agent', function (req, res) {
  res.render('agentSignupStep3', {
    status: 'ok',
    userID: req.user._id
  });
});

//Agent Step3 awaiting
app.get('/agent/signup/step2/awaiting/:agent', isLoggedIn, function (req, res) {
  Interview.find({
      'interviewee': req.params.agent
    })
    .exec(function (err, interview) {
      if (err) {
        console.log('err')
        console.log(err)
      }
      res.render('agentSignupStep2Awaiting', {
        status: 'ok',
        userID: req.user._id,
        date: moment(interview[0].date).add(3, 'hours').format('MMMM Do YYYY, h:mm a')
      });
    });
});
app.post('/agent/signup/step3/:agent', function (req, res) {
  uploadContract(req, res, (err) => {
    if (err) {
      console.log('err')
      console.log(err)
    } else {
      console.log('req.file')
      console.log(req.file.filename)
      if (req.file == undefined) {
        console.log('Error: No Files Selected!')
        res.send({
          status: 'bad',
          error: 'Error: No Files Selected!'
        })
      } else {
        console.log('req.params.agent')
        console.log(req.params)
        console.log(req.params.agent)
        User.updateOne({
            '_id': req.params.agent
          }, {
            $set: {
              'step': 'complete',
              'agentInfo.0.contract': req.file.filename,
            }
          },
          function (err, userInfo) {
            if (err) {
              console.log('=======================')
              console.log(err)
            } else {
              res.send({
                status: 'ok'
              })
            }

          });
        console.log('It was successful')
      }
    }
  })
});
//Agent Step2
app.get('/agent/signup/step2/:agent', isLoggedIn, function (req, res) {
  res.render('agentSignupStep2', {
    status: 'ok',
    userID: req.user._id
  })
});
app.post('/agent/signup/step2/:agent', function (req, res) {
  console.log(req.body)
  var date = req.body.date
  var interview = new Interview({
    interviewType: req.body.interviewType,
    date: date,
    interviewee: req.params.agent
  });


  User.updateOne({
      _id: req.params.agent
    }, {
      $set: {
        'step': 'awaiting'
      }
    },
    function (err, userInfo) {
      if (err) {
        console.log('=======================')
        console.log(err)
        return next(err);
      } else {
        console.log('Steps upgrade')
      }

    });

  console.log('got here')
  interview.save(function (err, interview) {
    if (err) {
      console.log(error)
      res.send({
        status: 'err',
        error: 'Error! Try again laters'
      })
    } else {
      console.log('ok')
      if (req.body.interviewType == 'visit') {

        nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'no-reply@landnbuy.com',
              pass: gMail.password
            }
          });

          // setup email data with unicode symbols
          let subscriber = {
            from: 'landNbuy <noreply@landnbuy.com>', // sender address
            to: req.user.local.email, // list of receivers
            subject: 'Request Received ✔', // Subject line
            text: 'Hi', // plain text body
            html: "<div style='background:black;color:white;padding:20px 15px;border-radius:10px;text-align: center;'><h5 style='text-align:center;font-size:2em;font-weight:bold;margin:0'>Become An Agent Request</h5><p style='font-size:1.2em;padding: 0;margin: 0;'>Your interview has been scheduled for " + moment(date).add(3, 'hours').format('MMMM Do YYYY, h:mm a') + "</p><p style='font-size:1.2em;padding: 0;margin: 0;'>We shall send you a Hangout request to your email.</p><p style='font-size:1.2em;margin: 0;'>In case of any inquiries about the interview, contact us at 0101 080050.</p><p style='font-size:1.2em;margin: 0;'>Thank you for choosing us.</p><div class='yj6qo'></div><div class='adL'><p></p></div><img src='https://www.landnbuy.com/img/emailFooter.jpeg' style='width: 100%; height: auto; object-fit: cover;'></div>" // html body
          };
          // send mail with defined transport object
          transporter.sendMail(subscriber, (error, info) => {
            if (error) {
              console.log(error)
              res.send({
                status: 'bad',
                err: 'Try again later'
              })
            } else {
              //Message sent successfully function here
              console.log('successful')
              res.send({
                status: 'ok',
                userID: req.user._id
              })
            }
          });
        });
      } else {
        nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'no-reply@landnbuy.com',
              pass: gMail.password
            }
          });

          // setup email data with unicode symbols
          let subscriber = {
            from: 'landNbuy <noreply@landnbuy.com>', // sender address
            to: req.user.local.email, // list of receivers
            subject: 'Request Received ✔', // Subject line
            text: 'Hi', // plain text body
            html: "<div style='background:black;color:white;padding:20px 15px;border-radius:10px;text-align: center;'><h5 style='text-align:center;font-size:2em;font-weight:bold;margin:0'>Become An Agent Request</h5><p style='font-size:1.2em;padding: 0;margin: 0;'>Your interview has been scheduled for " + moment(date).add(3, 'hours').format('MMMM Do YYYY, h:mm a') + "</p><p style='font-size:1.2em;padding: 0;margin: 0;'>Location: 1st floor, Arch business centre, eastern bypass ruiru (near kamakis)</p><p style='font-size:1.2em;margin: 0;'>In case of any inquiries about the interview, contact us at 0101 080050.</p><p style='font-size:1.2em;margin: 0;'>Thank you for choosing us.</p><div class='yj6qo'></div><div class='adL'><p></p></div><img src='https://www.landnbuy.com/img/emailFooter.jpeg' style='width: 100%; height: auto; object-fit: cover;'></div>" // html body
          };
          // send mail with defined transport object
          transporter.sendMail(subscriber, (error, info) => {
            if (error) {
              console.log(error)
              res.send({
                status: 'bad',
                err: 'Try again later'
              })
            } else {
              //Message sent successfully function here
              console.log('successful')
              res.send({
                status: 'ok',
                userID: req.user._id
              })
            }
          });
        });
      }


    }
  })
});
app.get('/buildings/show/all/:page', function (req, res) {
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Buildings.paginate({
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      console.log('resultsssss')
      console.log(results)
      res.render('allBuildings', {
        userActive: userActive,
        data: results.docs,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })

});
app.get('/lands/show/all/:page', function (req, res) {
  var activePage = req.params.page;
  const options = {
    page: parseInt(activePage),
    limit: 12
  }
  Lands.paginate({
    'approved': true
  }, options).then((results, err) => {
    if (!err) {
      res.render('allBuildings', {
        userActive: userActive,
        data: results.docs,
        page_count: results.totalPages,
        totalPages: results.totalPages,
        currentPage: activePage
      })
      //Pass the totalpages number to pug along with the result

    } else {
      console.log('came here')
    }
  })
});
//Become an agent
app.get('/agents/signup', function (req, res) {
  res.render('agentSignup', {
    status: 'ok',
  })
});

app.post('/tt', function (req, res) {
  console.log('req.user')
  console.log(req.user)
});
app.post('/agents/signup', function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      console.log('err')
      console.log(err)
    } else {
      console.log('req.file')
      console.log(req.files)
      if (req.files == undefined) {
        console.log('Error: No Files Selected!')
        res.send({
          status: 'bad',
          error: 'Error: No Files Selected!'
        })
      } else {
        console.log('It was successful')
        var passportArray = new Array();
        passportArray.push(req.files[0].filename)
        passportArray.push(req.files[2].filename)
        req.body.identity = passportArray
        req.body.passport = req.files[1].filename
        req.body.isAgent = true;
        passport.authenticate('agent-local-signup', {}, function (err, user, info) {
          if (user == false) {
            console.log('user info exist')
            res.status(200).json({
              status: 'bad',
              msg: 'Error! Email already exist'
            });

          } else {
            console.log('req.user')
            console.log(user)
            console.log(req.user)
            // req.user = req.user
            user => done(null, user)
            req.login(user, {}, function (err) {
              if (err) {
                return next(err)
              };
              res.status(200).json({
                status: 'ok',
                userID: req.user._id
              });
            });

          }

        })(req, res);
      }
    }
  })
});

//Agent Profile Page
app.get('/agent/profile', isLoggedIn, function (req, res, next) {
  var stage = req.user.step;
  if (req.user) {
    userActive = true;
  }
  if (stage == '1') {
    res.render('agentSignup', {
      user: req.user,
      userActive: userActive
    });
  }
  if (stage == '2') {
    res.redirect('/agent/signup/step2/' + req.user._id);
  } else if (stage == 'awaiting') {
    res.redirect('/agent/signup/step2/awaiting/' + req.user._id);
  } else if (stage == '3') {
    res.redirect('/agent/signup/step3/' + req.user._id);
  } else if (stage == 'complete') {
    res.redirect('/agent/signup/complete');
  } else if (stage == 'done') {
    console.log('req.user')
    console.log(req.user)
    if (req.user.approved == true) {
      async.parallel({
        building: function (callback) {
          Buildings.find({
              'uploaderID': req.user._id,
            })
            .exec(callback)
        },
        land: function (callback) {
          Lands.find({
              'uploaderID': req.user._id,
            })
            .exec(callback)
        },
      }, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          console.log('results')
          console.log(results.building.length)
          res.render('agentProfile', {
            user: req.user,
            userActive: userActive,
            buildings: results.building,
            lands: results.land
          });
        }
      })
    } else {
      res.render('agentProfileWait', {
        user: req.user,
        userActive: userActive
      });
    }

  }
});

//Agent Profile Page
app.get('/agent/login', function (req, res, next) {
  if (req.user) {
    userActive = true;
  }
  res.render('agentLogin', {
    msg: req.flash(),
    userActive: userActive
  });
});
app.post('/agent/login', function (req, res, next) {
  passport.authenticate('agent-local-login', function (err, user, info) {
    if (err) {
      console.log('got an error')
      res.send({
        status: 'bad',
        msg: 'Error! Try again later'
      })
    } else {
      if (!user) {
        // return res.redirect('/login');
        res.send({
          status: 'bad',
          msg: req.flash('agentLoginMessage')
        })
      } else {
        console.log('user is okay')
        console.log(user)
        if (req.session.returnTo == undefined) {
          req.session.returnTo = '/'
        }
        user => done(null, user)
        req.login(user, {}, function (err) {
          if (err) {
            return next(err)
          };
          res.status(200).json({
            status: 'ok',
            url: req.session.returnTo
          });
        });
      }
    }


  })(req, res, next);
});

//Profile Page
app.get('/profile', isLoggedIn, function (req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (req.user) {
    userActive = true;
  }
  res.render('profile', {
    userActive: userActive
  });
});

//Signup Page
app.get('/signup', function (req, res, next) {
  res.render('signup', {
    status: 'ok',
    msg: req.flash('signupMessage')
  });
});

//Login Page
app.get('/login', function (req, res, next) {
  res.render('login', {
    msg: req.flash(),
  });
});

// process the login form
app.post('/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log('got an error')
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
          res.status(200).json({
            status: 'ok',
            url: req.session.returnTo
          });
        });
      }
    }


  })(req, res, next);
});

/////////////////////////////////////////////////////////////////////////////
//                             Search
/////////////////////////////////////////////////////////////////////////////
app.post('/search/buildings', search_controller.search_buildings);
app.post('/search/lands', search_controller.search_lands);
app.post('/search/full/:category', search_controller.full_search);

/////////////////////////////////////////////////////////////////////////////
//                             BUILDINGS
/////////////////////////////////////////////////////////////////////////////
app.get('/buildings/apartments/:page', building_controller.get_apartments);
app.get('/buildings/bangalows/:page', building_controller.get_bangalows);
app.get('/buildings/mansions/:page', building_controller.get_mansions);
app.get('/buildings/commercial/:page', building_controller.get_commercial);
app.get('/buildings/industrial/:page', building_controller.get_industrial);
app.post('/buildings/upload/owner', building_controller.save_building);
app.post('/buildings/upload/agent', isLoggedIn, building_controller.save_building);
app.get('/buildings/:buildingType/:id', building_controller.building_details);
app.get('/buildings/awaiting/:buildingType/:id', building_controller.building_awating_confirmation);

//Failed to find property
app.post('/saveSearchEmptyUsers', building_controller.search_emptyUsers)
/////////////////////////////////////////////////////////////////////////////
//                             LANDS
/////////////////////////////////////////////////////////////////////////////

app.post('/lands/upload/owner', land_controller.save_land);
app.get('/land/:category/:landID', land_controller.get_land_details);
app.get('/lands/awaiting/:category/:landID', land_controller.get_awaiting_land_details);


/////////////////////////////////////////////////////////////////////////////
//                             APARTMENTS
/////////////////////////////////////////////////////////////////////////////
//Upload Property
app.get('/list-property/:property', function (req, res, next) {
  if (req.user) {
    userActive = true;
  }
  if (req.params.property == 'building') {
    res.render('buildingUploadSelect', {
      status: 'ok',
      userActive: userActive
    });
  } else if (req.params.property == 'land') {
    res.render('landUploadSelect', {
      status: 'ok',
      userActive: userActive
    });
  }

});
app.get('/panorama/:imageURL', function (req, res, next) {
  res.render('panorama', {
    data: '/uploads/' + req.params.imageURL
  });
});


app.get('/list-property/:property/owner', function (req, res, next) {
  if (req.user) {
    userActive = true;
  }
  if (req.params.property == 'building') {
    res.render('buildingUploadOwner', {
      status: 'ok',
      userActive: userActive
    });

  } else if (req.params.property == 'land') {
    res.render('landUploadOwner', {
      status: 'ok',
      userActive: userActive
    });
  }
});

app.get('/list-property/:property/agent', isLoggedIn, function (req, res, next) {
  if (req.user) {
    userActive = true;
  }
  console.log('req.user')
  console.log(req.user)
  if (req.user.approved != true) {
    res.render('agentUploadsError', {
      status: 'ok',
      userActive: userActive
    });
  } else {
    if (req.params.property == 'building') {
      res.render('buildingUploadAgent', {
        status: 'ok',
        agentID: req.user._id,
        userActive: userActive
      });

    } else if (req.params.property == 'land') {
      res.render('landUploadAgent', {
        status: 'ok',
        agentID: req.user._id,
        userActive: userActive
      });
    }
  }
});

//Apartment Post Request
app.post('/latest/apartments', apartment_controller.latest_apartment);

//Apartment Post Request
app.post('/list-property/land/upload', isLoggedIn, function (req, res, next) {
  // console.log(req.local)
});


// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

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
  res.redirect('/agent/login');
}

app.post('/save-message', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  message = req.body.message;
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@landnbuy.com',
        pass: gMail.password
      }
    });

    // setup email data with unicode symbols
    let subscriber = {
      from: 'landNbuy <no-reply@landnbuy.com>', // sender address
      to: 'info@landnbuy.com', // list of receivers
      subject: 'New Message ✔', // Subject line
      text: 'Hi', // plain text body
      html: '<div style="background: black;color: white;padding: 20px 15px;border-radius: 10px;"><h5 style=" text-align: center; font-size: 2em; font-weight: bold; margin: 0;">New Message!</h5><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Name:</span>' + name + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Email:</span>' + email + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Subject:</span>' + subject + '</p><p style=" font-size: 1.2em;"><span style=" font-weight: bold; padding-right: 10px;">Message:</span>' + message + '</p><p></p><img src="https://www.landnbuy.com/img/emailFooter.jpeg" style="width: 100%; height: auto; object-fit: cover;"></div>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(subscriber, (error, info) => {
      if (error) {
        console.log(error)
        res.send({
          status: 'err',
          err: "Error! Please enter a valid email"
        });
      } else {
        res.send({
          status: 'ok',
        })
      }
    });
  });
});

//Reset Password
app.get('/reset-password/request', function (req, res) {
  if (req.user) {
    userActive = true;
  }
  res.render('resetPasswordRequest', {
    userActive: userActive
  })
})
app.post('/reset-password/request', function (req, res) {
  User.findOne({
    'local.email': req.body.email
  }, function (err, user) {
    console.log('was here as well')
    if (err) {
      console.log('err')
      console.log(err)
    } else {
      console.log('user')
      console.log(user)
      if (user == null) {
        res.send({
          status: 'bad',
          error: 'Error! Email does not exist'
        })
      } else {
        var pin = Math.floor(1000 + Math.random() * 9000);
        nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'no-reply@landnbuy.com',
              pass: gMail.password
            }
          });

          // setup email data with unicode symbols
          let subscriber = {
            from: 'landNbuy <noreply@landnbuy.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Request Received ✔', // Subject line
            text: 'Hi', // plain text body
            html: "<div style='background:black;color:white;padding:20px 15px;border-radius:10px;text-align: center;'><h5 style='text-align:center;font-size:2em;font-weight:bold;margin:0'>Password Reset</h5><p style='font-size:1.2em;padding: 0;margin: 0;'>Copy the pin below to reset your password</p><p style='font-size:1.2em;margin: 0;'>" + pin + "</p><img src='https://www.landnbuy.com/img/emailFooter.jpeg' style='width: 100%; height: auto; object-fit: cover;'></div>" // html body
          };
          // send mail with defined transport object
          transporter.sendMail(subscriber, (error, info) => {
            if (error) {
              console.log('eror here')
              console.log(error)
              res.send({
                status: 'err',
                err: "Error! Please enter a valid email"
              });
            } else {
              //Message sent successfully function here
              var reset = new ResetPassword({
                email: req.body.email,
                pin: pin
              });
              reset.save(function (err, data) {
                if (err) {
                  console.log(err)
                  res.send({
                    status: 'err',
                    error: 'Error! Try again laters'
                  })
                } else {
                  console.log('data')
                  console.log(data)
                  res.send({
                    status: 'ok',
                    email: data.email
                  })
                }
              })
            }
          });
        });
      }
    }
  })


})
app.get('/reset-password/reset/:email', function (req, res) {
  if (req.user) {
    userActive = true;
  }
  res.render('resetPassword', {
    email: req.params.email,
    userActive: userActive
  })
})
app.post('/reset-password/reset/:email', function (req, res) {
  ResetPassword.findOne({
    'email': req.params.email,
    'pin': req.body.pin
  }).exec(function (err, data) {
    if (err) {
      console.log('err');
      console.log(err);
      res.send({
        status: 'bad',
        error: 'Error! Try again later'
      })
    } else {
      console.log('data')
      console.log(data)
      if (data == null) {
        res.send({
          status: 'bad',
          error: 'Error! Wrong pin'
        })
      } else {
        // update it with hash
        var password = req.body.password
        var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
        User.updateOne({
          'local.email': req.params.email
        }, {
          $set: {
            'local.password': hash
          }
        }, function (err, user) {
          if (err) {
            console.log('err')
            console.log(err)
            res.send({
              status: 'bad',
              error: 'Error! Try again later'
            })
          } else {
            console.log('user')
            console.log(user)
            res.send({
              status: 'ok',
            })
          }
        })
      }
    }
  })
});

//BUY REQUEST
app.get('/:type/:category/:id/buy', function (req, res) {
  if (req.params.type == 'buildings') {
    console.log('its a building')
    Buildings.find({
      '_id': req.params.id
    }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('came here')
        console.log(data[0])
        res.render('buyRequest', {
          heading: data[0].heading
        })
      }
    })
  } else {
    console.log('its a land')
    Lands.find({
      '_id': req.params.id
    }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('came here')
        console.log(data[0])
        res.render('buyRequest', {
          heading: data[0].heading
        })
      }
    })
  }
});
app.post('/property-buy-request', function (req, res) {
  console.log('req.body')
  console.log(req.body)
  var buyRequest = new BuyRequest({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNo,
    propertyID: req.body.propertyID,
  });
  buyRequest.save(function (err, data) {
    if (err) {
      console.log(err)
      res.send({
        status: 'err',
        error: 'Error! Try again laters'
      })
    } else {
      console.log('data')
      console.log(data)
      res.send({
        status: 'ok',
      })
    }
  })
});
app.post('/get-dates', function (req, res) {
  Dates.find()
    .exec(function (err, dates) {
      if (err) {
        console.log('was baaaad')
        res.send({
          status: 'bad',
        })
      } else {
        console.log('was goooooooood')
        var sendDates = new Array();
        for (i = 0; i < dates.length; i++) {
          sendDates.push(dates[i].date);
        }
        console.log(sendDates)
        res.send({
          status: 'ok',
          data: sendDates
        })
      }
    })
})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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