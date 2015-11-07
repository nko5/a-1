"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    google: String,
    firstName: String,
    lastName: String,
    city: String,
    state: String,
    zipCode: String,
    location: {
        type: {type: String},
        coordinates: {type: [Number], index: '2dsphere'}
    }
    //tasks: {type: Schema.Types.ObjectId, ref: 'Task'}
});

exports = module.exports = mongoose.model('User', userSchema);
