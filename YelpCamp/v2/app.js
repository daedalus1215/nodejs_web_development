var express           = require('express'),
    mongoClient       = require('mongodb'),
    mongoose          = require('mongoose'),
    methodOverride    = require('method-override'),
    app               = express(),
    path              = require('path'),
    expressSanitizer  = require('express-sanitizer'),
    bodyParser        = require('body-parser');


// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.use(expressSanitizer());
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.
app.use(express.static(path.join(__dirname, '/public')));

// MONGOOSE/MODEL CONFIG
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String

});
var Campground = mongoose.model('Campground', campgroundSchema); 



//INDEX - Homepage.
app.get('/', function(req, res) {
  res.render('landing');
});


/************************************************* beg - CAMPGROUNDS ******************************************************************/


Campground.create(
  { 
    name: 'Augustus Camp', 
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});


Campground.create(
  { 
    name: 'Nietzsche Camp', 
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});
Campground.create(
   { 
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
   }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});
Campground.create(
   {
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
   }
  , function(err, camp) {
      if (err) {
        console.log(err);
      } else {
        console.log('NEWLY CREATED CAMPGROUND: ');
        console.log(camp);
      }
});

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
<<<<<<< HEAD
    });
=======
    })
});
>>>>>>> 39372e40bbf2ba524ab4da0c71b01003b3dfdee3

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