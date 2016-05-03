var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_demo_embed');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  post: [postSchema]// embedding data inside of the userSchema.
});

var User = mongoose.model("User", userSchema);

var thePost = {
  title: "Yeah, first post tied to a user",
  content: "This is the content of the first post for the first user."
}


User.create({
  email: "cBrown@yahoo.com",
  name: "Charlie Brown"
});


User.findOne({email: "cBrown@yahoo.com"}, function(err, user) {
  if(err) {
    console.log(err);
  } else {
    user.post.push(thePost);
    console.log(user);
  }
});

