var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Home Page");
});

app.get('/bye', function(req, res) {
  res.send("Bye Page");
});

app.get('/dog', function(req, res) {
  res.send("Dog Page");
});

/* This is routes for url patterns. - /r/<anything> */
app.get("/r/:subredditName", function(req, res) {
  console.log(req.params.subredditName); // this will give us the actual value put in at /r/<anything>
  var subredit = req.params.subredditName;
  res.send("Welcome to the "+ subredit.toUpperCase() +" subredit.");
});

// url pattern for /r/<anything>/comments/<anything>/<anything>
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
  res.send("welcome to the comments page!");
});


// This will cover all url requests other than the ones we already defined.
app.get('*', function(req, res) {
  res.send("You are a star.");
});




app.listen(3000);