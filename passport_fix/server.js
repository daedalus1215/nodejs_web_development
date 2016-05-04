var express = require('express');
var app     = express();

var bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    auth            = require('./auth/auth');

mongoose.connect('mongodb://localhost/testdb');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// Setup Sessions middleware
app.use(session({
  secret: 'learn node',
  resave: true,
  saveUninitialized: false
}));

// Passport configuration
app.use(passport.initialize()); // initialize configuration
app.use(passport.session());   // then enable session support

var Account = require('./model/account'); // require our module we created.
passport.use(Account.createStrategy());   // passport has a callback that needs to be defined. Our passportLocalMongoose function will create this for us from the account module. 

// Functions store the users logged in state in the db - again, their work is mostly being done by the account module.
passport.serializeUser(Account.serializeUser());

passport.deserializeUser(Account.deserializeUser());





app.get('/', function(req, res) {
  res.render('index');
});

app.use('/auth/', auth);


app.listen(3000);