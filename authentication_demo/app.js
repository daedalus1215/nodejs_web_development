var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    User                  = require('./models/user'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');


// Connect to the db.
mongoose.connect('mongodb://localhost/auth_demo');

var app = express();

// Setup the View Engine (engine we are using to render pages).
app.set('view engine', 'ejs');

// Make sure we use bodyParser when handling a form.
app.use(bodyParser.urlencoded({extended: true}));



// These three are required when using passport.
app.use(require('express-session')({
    // must pass in these three options to the require
    secret: "Ella is the best", // this is used to encode and decode the session
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); // tell app to use passport
app.use(passport.session()); // tell app to setup session



// These three methods are important on passport - they are responsible for reading the session, taking the data from the session encoded and decode it, then encode decoded data for re-transmission. 
passport.use(new LocalStrategy(User.authenticate())); // created a new localstragey that is pulled from user.js, that allows us to use local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==========================
// ROUTES
//==========================

app.get('/', function (req, res) {
    'use strict';
    res.render('home');
});

app.get('/secret', function (req, res) {
    'use strict';
    res.render('secret');
});


//=============
// Auth Routes
//=============

// Register Routes
// show signup form
app.get('/register', function (req, res) {
    'use strict';
    res.render('register');
});

// handle user signup form.
app.post('/register',  passport.authenticate('local', {                 successRedirect: '/', 
failureRedirect: '/login' }));


// Login Routes
// Display login form
app.get('/login', function (req, res) {
    'use strict';
    res.render('login');
});

// Handle login form
app.post('/login',
         passport.authenticate("local"),
         function (req, res) {
        'use strict';
        res.redirect('/secret');
    }
    );


app.listen(3000, function () {
    'use strict';
    console.log("Authentication has begun");
});