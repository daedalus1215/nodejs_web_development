var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var friends = ["Augustus", "Cyrus", "Machiavelli", "Claudius", "Seutonius", "Herodotus"]; // to access friends we need to declare it outside of any route scope.

// Tell Nodejs to use the bodyParser and sets the extended option to true, which will make sure that we can parse any type that comes from a post request - not just a string or array (which is the case if it is set to false).
app.use(bodyParser.urlencoded({ extended: true })); 


app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});


app.get("/friends", function(req, res) {
  res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res) {
  console.log(req.body.newfriend);
  friends.push(req.body.newfriend);
  res.redirect("/friends"); // redirect will take another route's url.
});                 

app.listen(3000);