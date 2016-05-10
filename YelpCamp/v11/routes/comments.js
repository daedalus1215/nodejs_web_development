var express = require('express');
var router = express.Router( { mergeParams: true } ); // extra option object makes sure that we share parameters between our different route modules.
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObject = require('../middleware/index.js'); // can just do require('../middleware'); because we are pulling from index.js



//COMMENTS NEW
router.get('/new', middlewareObject.isLoggedIn, function(req, res) {
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
router.post('/', middlewareObject.isLoggedIn, function(req, res) {
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




//EDIT
router.get("/:comment_id/edit", middlewareObject.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
    }
  });
  
});




//UPDATE
router.put('/:comment_id', middlewareObject.checkCommentOwnership, function(req, res) {
  // this was giving me trouble when comment[text] was not set for the value I was not saving the object right
  // with req.body.comment, for some wierd reason it was not populating a full comment.
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if (err) {
      console.log("error, updating the comment");
      res.redirect('back');
    } else {
      console.log("Updated the following comment: " + updatedComment);
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});




//DESTROY
router.delete('/:comment_id', middlewareObject.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err, destroyedComment) {
    if (err) {
      console.log('error, deleteing the comment');
      res.redirect('back');
    } else {
      console.log('destroyed the following comment: ' );
      res.redirect('/campgrounds/' + req.params.id); //res.redirect('back'); //this would work too
    }
  });
});
  





module.exports = router;