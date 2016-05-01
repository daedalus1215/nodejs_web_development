var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  
});

var Comment = mongoose.model('Comment', commentSchema);

module.export = Comment;