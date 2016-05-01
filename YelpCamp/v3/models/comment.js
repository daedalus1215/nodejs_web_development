var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  text: String,
  Author: String,
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
