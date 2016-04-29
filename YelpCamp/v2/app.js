var express         = require('express'),
    mongoClient     = require('mongodb'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    app             = express(),
    bodyParser      = require('body-parser');


// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.


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


//Campground.create(
//  { 
//    name: 'Augustus Camp', 
//    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg' 
//  }
//  , function(err, camp) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log('NEWLY CREATED CAMPGROUND: ');
//        console.log(camp);
//      }
//});
//
//
//Campground.create(
//  { name: 'Nietzsche Camp', image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg' }
//  , function(err, camp) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log('NEWLY CREATED CAMPGROUND: ');
//        console.log(camp);
//      }
//});
//Campground.create(
//   { name: 'Confuscious Camp', image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg' }
//  , function(err, camp) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log('NEWLY CREATED CAMPGROUND: ');
//        console.log(camp);
//      }
//});
//Campground.create(
//   {
//    name: 'Confuscious Camp', 
//    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
//    description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//   }
//  , function(err, camp) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log('NEWLY CREATED CAMPGROUND: ');
//        console.log(camp);
//      }
//});

//INDEX ROUTE - display all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds, campgrounds});
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
  var name = req.body.name;
  var img = req.body.img;
  var newCampground = {name: name, image: img};
  
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
 //res.render('edit');
});

//UPDATE ROUTE
app.put('/campgrounds/:id', function(req, res) {
  // Find the campground with provided ID
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.render('show', {theCamp: updatedCampground});
      }
    })

});
/************************************************* end - CAMPGROUNDS ****************************************************************/


app.listen(3000, function() {
  console.log('YelpCamp Server has started');
});