var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app"); // this will create the db or use it (if it already exists).

// This tells mongoose (js) that we want to add cats to the database and a cat looks like this. This is not designing our table, it's 
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// This is a cat object that is just a design pattern and has all of the methods that are relative to mongo.
var Cat = mongoose.model("Cat", catSchema); // this will actually create the cat collections

// adding a new catr to the DB
/*
var george = new Cat({
  name: "Mrs. Norris",
  age: 7,
  temperament: "Evil"
});
*/

// Save might not work, because connection might be down or Mongo Server is not up, so we can just pass a callback function into the save method (delegate).
/*george.save(function(err, cat) {
  if (err) {
    console.log("SOMETHING WENT WRONG.");
  } else {
    console.log("WE JUST SAVED THE CAT.");
    console.log(cat);
  }
});*/

// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) {
  if (err) {
    console.log("ERROR:" + err);
  } else {
    console.log(cats);
  }
});