var express = require('express');
var app = express();




app.use(express.static("public"));
app.set("view engine", "ejs"); // that way when we res.render("home"); it doesn't need to be "home.ejs".

app.get('/', function(req, res) {
  console.log("working");
  res.render("home");
});

app.get('/fallin/:thing', function(req, res) {
  var thing = req.params.thing;
  res.render("love", {thingVar: thing.toUpperCase()});
});


app.get('/posts', function(req, res) {
  var posts = [
    {title: "Post 1", author: "Augustus"},
    {title: "Post 2", author: "Caesar"},
    {title: "Post 3", author: "Darius"},
    {title: "Post 4", author: "Cyrus"}
  ];
  
  res.render("posts", {posts: posts});
});



app.listen(3000);