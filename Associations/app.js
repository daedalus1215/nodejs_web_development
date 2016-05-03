var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_demo');

var Post = require('./models/post');
var User = require('./models/user');





/*User.create({
  email: 'ladams@yahoo.com',
  name: 'Larry Adams'
}, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    Post.create({
      title: "This is Larry's first post - 1st",
      content: "Content of the first post by Laurence."
    }, function(err, post) {
        if (err) {
          console.log(err);
        } else {
         user.posts.push(post);   
         user.save(function(err, data) {
         if (err) {
             console.log(err);
         } else {
           console.log(data);
         }
       })
      }
    });
  }
});*/

User.findOne({email: 'ladams@yahoo.com'}).populate('posts').exec(function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
})
