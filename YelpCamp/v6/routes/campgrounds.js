var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

/************************************************* beg - CAMPGROUNDS ******************************************************************/

//INDEX ROUTE - display all campgrounds
router.get('/campgrounds', function(req, res) {
  
  
  // Get all campgrounds from db
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log('ERROR: ' + err);
    } else {
      res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
    }
  });
});

//NEW ROUTE - show form to create new campground
router.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new')
});

//CREATE ROUTE - add new campground to DB
router.post('/campgrounds', function(req, res) {
  // Get data from form and add to campgrounds array.
  var name = req.sanitize(req.body.campground.name); // sanitize
  var img = req.sanitize(req.body.campground.img); // sanitize
  var desc = req.sanitize(req.body.campground.description); // sanitize
  
  var newCampground = 
                      { 
                        name: name, 
                        image: img,
                        description: desc
                      };

  Campground.create(newCampground, function(err, newCamp) {
    if (err) {
      console.log(err);
    } else {
      // Redirect us back to campgrounds.
      res.redirect('campgrounds/campgrounds');
    }
  });
  
});

//SHOW ROUTE - display info about one campground.
router.get('/campgrounds/:id', function(req, res) {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
    if (err) {
      console.log("ERROR: ");
      console.log(err);
    } else {
      // Render the page and pass the campground object
      console.log(foundCamp);
      res.render('campgrounds/show', {theCamp: foundCamp});
    }
  });
});

//EDIT ROUTE - edit the campground
router.get('/campgrounds/:id/edit', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log('Error with the campground retrieval');
      console.log(err);      
    } else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

//UPDATE ROUTE
router.put('/campgrounds/:id', function(req, res) {
  // Find the campground with provided ID
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, {new:true}, function(err, updatedCampground) {
      if (err) {
        res.redirect("campgrounds/campgrounds");
      } else {
        console.log("UPDATED <br/>" + updatedCampground);
        res.redirect('../campgrounds/' + req.params.id);
      }
    })
});

//DELETE ROUTE
router.delete('/campgrounds/:id', function(req, res) {
  // Destroy campground
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("campgrounds/campgrounds");
    } else {
      res.redirect("campgrounds/campgrounds");
    }
  });
  // Redirect
});

module.exports = router;