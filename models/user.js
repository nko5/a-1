var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    google: String
    //profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    //tasks: {type: Schema.Types.ObjectId, ref: 'Task'}
});

exports = module.exports = mongoose.model('User', userSchema);
