var mongoose = require('mongoose');




var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
    author: 
    {
        username: String,
        id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    

});



var Campground = mongoose.model('Campground', campgroundSchema); 





module.exports = Campground;