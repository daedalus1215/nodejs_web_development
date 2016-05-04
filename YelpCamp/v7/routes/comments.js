var express = require('express');
var router = express.Router( { mergeParams: true } ); // extra option object makes sure that we share parameters between our different route modules.
var Campground = require('../models/campground');
var Comment = require('../models/comment');




//COMMENTS NEW
router.get('/new', isLoggedIn, function(req, res) {
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




//COMMENTS CREATE
router.post('/', isLoggedIn, function(req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, rCampground) {
    if (err) { 
      console.log("ERROR finding campground with the id - " + err); 
      res.redirect("/campgrounds");
    } else {
      var comment = req.body.comment;
      //console.log(comment);
      // we found a campground.  
      Comment.create({author: comment.author, text: comment.text}, function(err, rComment) {
        if (err) {
          console.log("ERROR making comment - " + err);
        } else {
          // add username and id to comment
          rComment.author.id = req.user._id;
          rComment.author.username = req.user.username;
          // save comment
          rComment.save();
          // update campground with new comment
          rCampground.comments.push(rComment);
          // save campground
          rCampground.save();
          // redirect
          res.redirect('/campgrounds/' + req.params.id);
        }
      });
    }
    
  })
});




// Add middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}




module.exports = router;