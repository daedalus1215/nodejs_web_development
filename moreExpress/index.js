var express = require('express');
var app = express();







app.get('/', function(req, res) {
  console.log("working");
  res.render("home.ejs");
});

app.get('/fallin/:thing', function(req, res) {
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});




app.listen(3000);