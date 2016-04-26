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
    { name: "Augustus Camp", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg" },
    { name: "Nietzsche Camp", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg" }, 
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" }
  ];
  
  res.render("campgrounds", {campgrounds, campgrounds});
  
});


app.listen(3000, function() {
  console.log("YelpCamp Server has started");
});