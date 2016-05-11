var express = require('express');
var router = express.Router();
var passport = require('passport');
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var User = require('../models/user');

//INDEX - Homepage.
router.get('/', function(req, res) {
  res.render('landing');
});



/************************************************* beg - AUTH routerS ******************************************************************/


/*==========*/
/* Register */
/*==========*/

//NEW Show register form
router.get('/register', function(req, res) {
  res.render('register');
});

//CREATE Handle register logic
router.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, function(err, rUser) {
    if (err) {
      req.flash('error', err.message);
      //console.log("ERROR!!! " + err);
      return res.redirect("register");
    }
    
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to YelpCamp' + rUser.username);
      res.redirect('/campgrounds');
    });    
  });
});


/*==========*/
/* login */
/*==========*/

//NEW Show login form
router.get('/login', function(req, res) {
  
  res.render('login');
})

// handle login form.
// use our middleware to do login
router.post('/login', passport.authenticate('local', 
   { 
    successRedirect: '/campgrounds', 
    failureRedirect: '/login'
   }), function(req, res) {
  
});


/*==========*/
/* logout */
/*==========*/

//INDEX logout router
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});
/************************************************* end - AUTH routerS ******************************************************************/


module.exports = router;