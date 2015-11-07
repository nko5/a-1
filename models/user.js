var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    google: String,
    firstName: String,
    lastName: String,
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    zipCode: {type: String, default: ''},
    location: {
        type: {type: String},
        coordinates: {type: [Number], index: '2dsphere'}
    }

    //profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    //tasks: {type: Schema.Types.ObjectId, ref: 'Task'}
});

exports = module.exports = mongoose.model('User', userSchema);
