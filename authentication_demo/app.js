var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')
    User                  = require('./models/user');


// Connect to the db.
mongoose.connect('mongodb://localhost/auth_demo');

var app = express();

// Setup the View Engine (engine we are using to render pages).
app.set('view engine', 'ejs');


app.use(passport.initialize()); // tell app to use passport
app.use(passport.session()); // tell app to setup session

// These three are required when using passport.
app.use(require('express-session')({
  // must pass in these three options to the require
  secret: "Ella is the best", // this is used to encode and decode the session
  resave: false,
  saveUninitialized: false
}));

// These two methods are important on passport - they are responsible for reading the session, taking the data from the session encoded and decode it, then encode decoded data for re-transmission. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get('/', function(req, res) {
  res.render('home');
});

app.get('/secret', function(req, res) {
  res.render('secret');
})

app.listen(3000, function() {
  console.log("Authentication has begun");
});