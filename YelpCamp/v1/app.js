var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended : true})) // make sure that we are using the body parser and setting extended option to true.

app.set("view engine", "ejs"); // Set the view engine to be ejs.

app.get("/", function(req, res) {
  res.render("landing");
});


app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    { name: "Augustus Camp", title: "http://" },
    { name: "Nietzsche Camp", title: "http://" }
  ];
});


app.listen(3000, function() {
  console.log("YelpCamp Server has started");
});