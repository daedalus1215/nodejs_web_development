var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');

/************************************************* beg - COMMENTS ******************************************************************/

//INDEX ROUTE - Display a list of comments.
router.get('/comment', function(req, res) {
  
});

// Two routers below are examples of "Nested Routes." \\
//NEW ROUTE - Form to setup a new comment to be created.
router.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, theCampground) {
    if (err) {
      console.log("ERROR finding campground with the id - " + err);
      res.redirect('/campgrounds');
    } else {
      // we got back the right campground
      res.render("comments/new", {campground: theCampground});
    }
  });
  
});

//CREATE ROUTE - Adds a new comment to the DB
router.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, rCampground) {
    if (err) { 
      console.log("ERROR finding campground with the id - " + err); 
      res.redirect("/campgrounds");
    } else {
      var comment = req.body.comment;
      console.log(comment);
      // we found a campground.  
      Comment.create({author: comment.author, text: comment.text}, function(err, rComment) {
        if (err) {
          console.log("ERROR making comment - " + err);
        } else {
          rCampground.comments.push(rComment);
          rCampground.save();
          res.redirect('/campgrounds/' + req.params.id);
        }
      });
    }
    
  })
  // create new comment
  // connect new comment to campground
  // redirect to campground show page.
});

//SHOW ROUTE - Shows info about a particular comment.
router.get('/comment/:id', function(req, res) {
  
});

/************************************************* end - COMMENTS ******************************************************************/

// Add middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;