var express           = require('express'),
    mongoClient       = require('mongodb'),
    mongoose          = require('mongoose'),
    methodOverride    = require('method-override'),
    app               = express(),
    path              = require('path'),
    expressSanitizer  = require('express-sanitizer'),
    bodyParser        = require('body-parser'),
    seedDB            = require('./seeds');

// MONGOOSE/MODEL CONFIG
var Campground = require('./models/campground');
var Comment = require('./models/comment');



seedDB();
// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.use(expressSanitizer());
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.
app.use(express.static(path.join(__dirname, '/public')));





//INDEX - Homepage.
app.get('/', function(req, res) {
  res.render('landing');
});


/************************************************* beg - CAMPGROUNDS ******************************************************************/




//INDEX ROUTE - display all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log('ERROR: ' + err);
    } else {
      res.render('campgrounds', {campgrounds: campgrounds});
    }
  });
});

//NEW ROUTE - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new')
});

//CREATE ROUTE - add new campground to DB
app.post('/campgrounds', function(req, res) {
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
      res.redirect('/campgrounds');
    }
  });
  
});

//SHOW ROUTE - display info about one campground.
app.get('/campgrounds/:id', function(req, res) {
  // Find the campground with provided ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log("ERROR: ");
      console.log(err);
    } else {
      // Render the page and pass the campground object
      res.render('show', {theCamp: campground});
    }
  });
});

//EDIT ROUTE - edit the campground
app.get('/campgrounds/:id/edit', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log('Error with the campground retrieval');
      console.log(err);      
    } else {
      res.render('edit', {campground: foundCampground});
    }
  });
});

//UPDATE ROUTE
app.put('/campgrounds/:id', function(req, res) {
  // Find the campground with provided ID
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, {new:true}, function(err, updatedCampground) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        console.log(updatedCampground);
        res.redirect('/campgrounds/' + req.params.id);
      }
    })
});

//DELETE ROUTE
app.delete('/campgrounds/:id', function(req, res) {
  // Destroy campground
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
  // Redirect
});
/************************************************* end - CAMPGROUNDS ****************************************************************/


app.listen(3000, function() {
  console.log('YelpCamp Server has started');
});