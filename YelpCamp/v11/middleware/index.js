// All of the middleware goes here


var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObject = {};




// Make sure the user is loggede in.
middlewareObject.isLoggedIn  = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
}




middlewareObject.checkCampgroundOwnership = function (req, res, next) {
  // is the user logged in
  if (req.isAuthenticated()) {
    // grab thwe campground with the specific id
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        req.flash('error', 'Campground not found.');
        console.log('Error with the campground retrieval');
        console.log(err);    
        res.redirect("back");
      } else {
        // Does user own campground
        if (foundCampground.author.id.equals(req.user._id)) {
          // run the rest of the route's execution context.
          next();        
        } else {
          // if not, redirect
          req.flash('error', 'You don\'t have permission to do that.');
          res.redirect("back");
        }
      }
    });    
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect("/login");
  }
}




// Make sure the user owns this particular comment.
middlewareObject.checkCommentOwnership = function (req, res, next) {
  // is the user logged in
  if (req.isAuthenticated()) {
    // grab thwe campground with the specific id
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        req.flash('error', 'Error finding specific comment.');
        console.log('Error with the campground retrieval');
        console.log(err);    
        res.redirect("back");
      } else {
        // Does user own comment
        if (foundComment.author.id.equals(req.user._id)) {
          // run the rest of the route's execution context.
          next();        
        } else {
          // if not, redirect
          req.flash('error', 'You don\'t have permission to do that.');
          res.redirect("back");
        }
      }
    });    
  } else {
    req.flash('error', 'You need to be logged in to do that.');
    res.redirect("back");
  }
}



module.exports = middlewareObject;