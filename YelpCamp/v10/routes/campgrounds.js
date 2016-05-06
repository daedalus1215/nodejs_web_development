var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');



//INDEX ROUTE - display all campgrounds
router.get('/', function(req, res) {  
  console.log('SHOW CAMPGROUNDS');
  // Get all campgrounds from db
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log('ERROR+: ' + err);
    } else {
      res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
    }
  });
});




//NEW ROUTE - show form to create new campground
router.get('/new', isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
});




//CREATE ROUTE - add new campground to DB
router.post('/', isLoggedIn, function(req, res) {
    console.log("CREATE THE NEW campground.");
    console.log('campground OBJECT = ' + req.body.campground.name);
    
    // Get data from form and add to campgrounds array.
    var name = req.sanitize(req.body.campground.name); // sanitize
    var img = req.sanitize(req.body.campground.img); // sanitize
    var desc = req.sanitize(req.body.campground.description); // sanitize

    // Get the user
    var user = req.user;
    // Make the author
    var author = 
        {
            id: user._id,
            username: user.username
        }
    // Declare and instantiate new campground
    var newCampground = 
                      { 
                        name: name, 
                        image: img,
                        description: desc,
                        author: author
                      };
    
    // Create the new campground
    Campground.create(newCampground, function(err, newCamp) {
        if (err) {
          console.log("ERROR CREATING CAMPGROUND: -- " + err);
        } else {
          console.log("NEWLY CREATED CAMPGROUND ============ " + newCamp);
          // Redirect us back to campgrounds.
          res.redirect('/campgrounds');
        }
    });
  
});


//SHOW ROUTE - display info about one campground.
router.get('/:id', function(req, res) {
  console.log('SHOW A PARTICULAR CAMPGROUNDS, with an ID of = ' + req.params.id);
  console.log(req.params);
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
    if (err) {
      console.log("ERROR-: ");
      console.log(err);
    } else {
      // Render the page and pass the campground object
      console.log(foundCamp);
      res.render('campgrounds/show', {theCamp: foundCamp});
    }
  });
});




//EDIT ROUTE - edit the campground
router.get('/:id/edit', isLoggedIn, function(req, res) {
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
router.put('/:id', isLoggedIn, function(req, res) {
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
router.delete('/:id', function(req, res) {
  // Destroy campground
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});



// Add middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;