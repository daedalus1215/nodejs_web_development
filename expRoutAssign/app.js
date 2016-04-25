var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/pig', function(req, res) {
  res.send("The pig says.. ");
});

app.get('/speak/cow', function(req, res) {
  res.send("The cow says.. ");
});

app.get('/speak/dog', function(req, res) {
  res.send("The dog says.. ");
});

app.get('/repeat/hello/:times', function(req, res) {
  var repeat = req.params.times;
  var hellos = "hello"; // initial hello.
  
  // Build up our string.
  for (var i = 1; i < repeat; i++) {
    hellos += " hello";
  }
  
  res.send(hellos);
});

app.get("/repeat/blah/:times", function(req, res) {
  var repeat = req.params.times;
  var blah = "blah";
  
  // Build up our string.
  for (var i = 1; i < repeat; i++) {
    blah += " blah";
  }
  
  res.send(blah);
});

app.get('*', function(req, res) {
  res.send("Sorry, page not found... What are you doing here?");
});


app.listen(3000);