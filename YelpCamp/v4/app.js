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




// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp_v4'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.use(expressSanitizer());
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.
app.use(express.static(path.join(__dirname, '/public')));


// Populate some stuff.
seedDB();

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
      res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
    }
  });
});

//NEW ROUTE - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new')
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
      res.redirect('campgrounds/campgrounds');
    }
  });
  
});

//SHOW ROUTE - display info about one campground.
app.get('/campgrounds/:id', function(req, res) {
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
app.get('/campgrounds/:id/edit', function(req, res) {
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
app.put('/campgrounds/:id', function(req, res) {
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
app.delete('/campgrounds/:id', function(req, res) {
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

/************************************************* end - CAMPGROUNDS ****************************************************************/



/************************************************* beg - COMMENTS ******************************************************************/

//INDEX ROUTE - Display a list of comments.
app.get('/comment', function(req, res) {
  
});

// Two routes below are examples of "Nested Routes." \\
//NEW ROUTE - Form to setup a new comment to be created.
app.get('/campgrounds/:id/comments/new', function(req, res) {
  res.render("comments/new");
});

//CREATE ROUTE - Adds a new comment to the DB
app.post('/campgrounds/:id/comments', function(req, res) {
  
});

//SHOW ROUTE - Shows info about a particular comment.
app.get('/comment/:id', function(req, res) {
  
});

/************************************************* end - COMMENTS ******************************************************************/







app.listen(3000, function() {
  console.log('YelpCamp Server has started');
});