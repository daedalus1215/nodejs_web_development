var mongoose              = require('mongoose'),
    Schema                = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({
  nickname:  String,
  birthdate: Date
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);