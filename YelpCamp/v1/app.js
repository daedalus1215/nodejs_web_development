var express = require("express");
var mongoClient = require('mongodb');

var app = express();
var bodyParser = require("body-parser");

// Connect to the db
mongoClient.connect



app.use(bodyParser.urlencoded({ extended : true})) // make sure that we are using the body parser and setting extended option to true.

app.set("view engine", "ejs"); // Set the view engine to be ejs.

app.get("/", function(req, res) {
  res.render("landing");
});


/********************** beg - CAMPGROUNDS ***************************************************************************/
var campgrounds = 
  [
    { name: "Augustus Camp", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg" },
    { name: "Nietzsche Camp", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg" }, 
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" },
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" },
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" },
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" },
    { name: "Confuscious Camp", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg" }
  ];
//INDEX - display all campgrounds.
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds, campgrounds});
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new")
});

app.post("/campgrounds", function(req, res) {
  // Get data from form and add to campgrounds array.
  var name = req.body.name;
  var img = req.body.img;
  var newCampground = {name: name, image: img};
  campgrounds.push(newCampground);
  // Redirect us back to campgrounds.
  res.redirect("/campgrounds");
});

/************************************************* end - CAMPGROUNDS *******************************************************************************************************/


app.listen(3000, function() {
  console.log("YelpCamp Server has started");
});