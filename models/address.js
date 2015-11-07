"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    streetOne: {type: String, default: ''},
    streetTwo: {type: String, default: ''},
    city: String,
    state: String,
    zipCode: String,
    location: {
        coordinates: {type: [Number], index: '2dsphere'}
    }
});

exports = module.exports = mongoose.model('Address', addressSchema);
