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

app.get('*', function(req, res) {
  res.send("You are a star.");
});

app.listen(3000);