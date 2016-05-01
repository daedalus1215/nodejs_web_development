var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [
  { 
    name: 'Confuscious Camp', 
    image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
   },
  { 
    name: 'Nietzsche Camp', 
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  },
  { 
    name: 'Augustus Camp', 
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  }
];


function seedDB() {
  // Wipe everything out of our db
  Campground.remove({}, function(err) {
    if (err) { console.log(err); }
    // We removed the Campgrounds
    else {
      console.log('Removed Campgrounds!');
      // Add a few campgrounds
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if (err) { console.log(err); }
          // We created the campground.
          else {
            console.log("added a campground");
            // Create a comment
            Comment.create({
              text: "This place is great, but I wish there was internet!",
              author: "Homer"
            }, function(err, comment) {
              if (err) { console.log("ERROR CREATING COMMENT " + err); }
              // We created the comment, add it to campground.
              else {
                console.log("Created a new comment");
                campground.comments.push(comment);
                campground.save();
              }
            });
          }
        });  
      });
    }  
  });  
}

module.exports = seedDB;