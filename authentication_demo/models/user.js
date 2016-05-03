var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// setup schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Take our package (passportLocalMongoose) and add a bunch of methods that come wiht that package to our userSchema.
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
