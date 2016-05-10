var express           = require('express'),
    mongoClient       = require('mongodb'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local'),
    methodOverride    = require('method-override'),
    app               = express(),
    path              = require('path'),
    flash             = require('connect-flash'),
    expressSanitizer  = require('express-sanitizer'),
    bodyParser        = require('body-parser');
   


// ROUTES
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');


// MONGOOSE/MODEL CONFIG
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
var User       = require('./models/user');

//var seedDB     = require('./seeds');




// APP CONFIG
mongoose.connect('mongodb://localhost/yelp_camp_v4'); // Must connect our ORM to the db.
app.use(bodyParser.urlencoded({extended : true})) // make sure that we are using the body parser and setting extended option to true.
app.use(expressSanitizer());
app.set('view engine', 'ejs'); // Set the view engine to be ejs.
app.use(methodOverride('_method')); // Tell out app that whenever we get the request that has _method as a parameter, take whatever it is equal to and treat that request as a put request or as a delete request.
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());




 //seedDB(); // Populate some stuff. 




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


// Add Middleware
app.use(function(req, res, next) {// we want to make sure every route checks to see if we have a currentUser object. This way the navbar can handle this accordinly.
  res.locals.currentUser = req.user; // anything placed in res.locals is anything inside of our template
  next(); // we need to make sure we execute the next code, after the middleware.
});

// Use those routes.
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);





app.listen(3000, function() {
  console.log('YelpCamp Server has started');
});