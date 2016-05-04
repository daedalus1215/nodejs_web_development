var express           = require('express'),
    mongoClient       = require('mongodb'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local'),
    methodOverride    = require('method-override'),
    app               = express(),
    path              = require('path'),
    expressSanitizer  = require('express-sanitizer'),
    bodyParser        = require('body-parser');
   


// MONGOOSE/MODEL CONFIG
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
var User       = require('./models/user');

var seedDB     = require('./seeds');




// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp_v4'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.use(expressSanitizer());
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.
app.use(express.static(path.join(__dirname, '/public')));



// Populate some stuff.
seedDB();




// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'node code',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





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
app.post('/campgrounds/:id/comments', function(req, res) {
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
app.get('/comment/:id', function(req, res) {
  
});

/************************************************* end - COMMENTS ******************************************************************/


/************************************************* beg - AUTH ROUTES ******************************************************************/

//NEW Show register form
app.get('/register', function(req, res) {
  res.render('register');
});

//CREATE Handle register logic
app.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, function(err, rUser) {
    if (err) {
      console.log("ERROR!!! " + err);
      return res.render("register");
    }
    
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds');
    });    
  });
});

//New Show login form
app.get('/login', function(req, res) {
  res.render('login');
})
//CREATE handle login form.
app.post('/login', function(req, res) {
  res.send("LOGIN LOGIC HAPPENS HERE");
});
/************************************************* end - AUTH ROUTES ******************************************************************/




app.listen(3000, function() {
  console.log('YelpCamp Server has started');
});